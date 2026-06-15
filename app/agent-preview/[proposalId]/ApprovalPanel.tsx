'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { DraftCampaignProposalStatus } from '@/src/agent/types'

type ApprovalPanelProps = {
  proposalId: string
  initialStatus: DraftCampaignProposalStatus
  isLocalPreview: boolean
}

type ApiResult = {
  ok: boolean
  status?: DraftCampaignProposalStatus
  message?: string
}

const statusLabels: Record<DraftCampaignProposalStatus, string> = {
  draft: 'Draft',
  approved: 'Approved',
  applied: 'Applied',
  rejected: 'Rejected'
}

const statusStyles: Record<DraftCampaignProposalStatus, string> = {
  draft: 'border-orange-500 bg-orange-50 text-orange-500',
  approved: 'border-blue-50 bg-blue-25 text-blue-500',
  applied: 'border-green-500 bg-white-500 text-green-600',
  rejected: 'border-red-500 bg-red-50 text-red-500'
}

function getErrorMessage(result: ApiResult, fallback: string) {
  if (!result.message) {
    return fallback
  }

  return result.message
}

export default function ApprovalPanel({ proposalId, initialStatus, isLocalPreview }: ApprovalPanelProps) {
  const router = useRouter()
  const [status, setStatus] = useState(initialStatus)
  const [pendingAction, setPendingAction] = useState<'approve' | 'reject' | undefined>()
  const [message, setMessage] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const applyCommand = `npm.cmd run apply:campaign-proposal -- ${proposalId}`

  async function changeStatus(nextStatus: 'approved' | 'rejected') {
    setPendingAction(nextStatus === 'approved' ? 'approve' : 'reject')
    setMessage(undefined)
    setError(undefined)

    try {
      const response = await fetch(`/api/agent-proposals/${proposalId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      const result = (await response.json()) as ApiResult

      if (!response.ok || !result.ok || !result.status) {
        throw new Error(getErrorMessage(result, 'Could not update proposal status.'))
      }

      setStatus(result.status)
      setMessage(nextStatus === 'approved' ? 'Proposal approved' : 'Proposal rejected')
      router.refresh()
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Could not update proposal status.')
    } finally {
      setPendingAction(undefined)
    }
  }

  async function copyApplyCommand() {
    setError(undefined)

    try {
      await navigator.clipboard.writeText(applyCommand)
      setMessage('Apply command copied')
    } catch {
      setError('Could not copy automatically. Please select and copy the command below.')
    }
  }

  const isBusy = Boolean(pendingAction)

  return (
    <section className="mb-6 rounded-lg border border-dark-50 bg-white-500 p-4 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-label-sm font-bold text-dark-300">Proposal status</div>
          <div
            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-label-sm font-bold ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </div>
        </div>

        {isLocalPreview ? (
          <div className="flex flex-wrap gap-2">
            {status === 'draft' && (
              <>
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-label-sm font-bold text-white-500 disabled:opacity-60"
                  disabled={isBusy}
                  type="button"
                  onClick={() => changeStatus('approved')}
                >
                  {pendingAction === 'approve' ? 'Approving...' : 'Approve'}
                </button>
                <button
                  className="rounded-md border border-red-500 bg-red-50 px-4 py-2 text-label-sm font-bold text-red-500 disabled:opacity-60"
                  disabled={isBusy}
                  type="button"
                  onClick={() => changeStatus('rejected')}
                >
                  {pendingAction === 'reject' ? 'Rejecting...' : 'Reject'}
                </button>
              </>
            )}

            {status === 'applied' && (
              <Link className="rounded-md border border-blue-50 bg-blue-25 px-4 py-2 text-label-sm font-bold text-blue-500" href="/mua-the-game">
                Open live website
              </Link>
            )}
          </div>
        ) : (
          <div className="rounded-md border border-dark-50 bg-dark-25 px-3 py-2 text-label-sm font-bold text-dark-300">
            Localhost controls only
          </div>
        )}
      </div>

      {message && <div className="mt-4 rounded-md border border-green-500 bg-white-500 px-3 py-2 text-label-md font-bold text-green-600">{message}</div>}
      {error && <pre className="mt-4 whitespace-pre-wrap rounded-md bg-red-50 px-3 py-2 text-label-md font-bold text-red-500">{error}</pre>}

      {status === 'approved' && (
        <div className="mt-4 rounded-lg border border-blue-50 bg-blue-25 p-3">
          <div className="text-label-md font-bold text-dark-500">
            Proposal approved. To apply safely, run this command in your terminal.
          </div>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
            <code className="min-w-0 flex-1 select-all overflow-x-auto rounded-md bg-white-500 px-3 py-2 text-label-md font-bold text-dark-500">
              {applyCommand}
            </code>
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-label-sm font-bold text-white-500"
              type="button"
              onClick={copyApplyCommand}
            >
              Copy command
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
