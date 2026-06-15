import { NextResponse } from 'next/server'
import { isLocalRequest } from '@/src/agent/localOnly'
import { getCampaignProposal, updateCampaignProposalStatus } from '@/src/agent/proposalRepository'
import { DraftCampaignProposalStatus } from '@/src/agent/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type StatusRouteProps = {
  params: {
    proposalId: string
  }
}

function isSupportedStatus(status: unknown): status is Extract<DraftCampaignProposalStatus, 'approved' | 'rejected'> {
  return status === 'approved' || status === 'rejected'
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown proposal status error'
}

export async function POST(request: Request, { params }: StatusRouteProps) {
  if (!isLocalRequest(request)) {
    return NextResponse.json({ ok: false, message: 'Proposal approvals are available on localhost only.' }, { status: 403 })
  }

  const body = await request.json().catch(() => ({}))
  const nextStatus = body?.status

  if (!isSupportedStatus(nextStatus)) {
    return NextResponse.json({ ok: false, message: 'Status must be approved or rejected.' }, { status: 400 })
  }

  const proposal = getCampaignProposal(params.proposalId)

  if (!proposal) {
    return NextResponse.json({ ok: false, message: `Proposal not found: ${params.proposalId}` }, { status: 404 })
  }

  if (proposal.status !== 'draft') {
    return NextResponse.json(
      { ok: false, message: `Only draft proposals can be approved or rejected. Current status: ${proposal.status}` },
      { status: 409 }
    )
  }

  try {
    const updatedProposal = updateCampaignProposalStatus(params.proposalId, nextStatus)
    return NextResponse.json({ ok: true, status: updatedProposal.status })
  } catch (error) {
    return NextResponse.json({ ok: false, message: getErrorMessage(error) }, { status: 500 })
  }
}
