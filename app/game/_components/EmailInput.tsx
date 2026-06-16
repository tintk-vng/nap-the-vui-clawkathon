'use client'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string {
  if (!value.trim()) {
    return 'Bạn chưa nhập email để nhận thông tin'
  }
  if (!EMAIL_REGEX.test(value)) {
    return 'Email chưa đúng định dạng'
  }
  return ''
}

function stripAccents(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

type EmailInputProps = {
  value: string
  error?: string
  onChange: (value: string) => void
}

export default function EmailInput({ value, error, onChange }: EmailInputProps) {
  return (
    <div className="mb-9">
      <div className="mb-4 text-heading-md md:text-heading-lg">Email nhận mã thẻ</div>

      <input
        className={`h-[52px] w-full rounded-lg border px-4 text-label-lg outline-none transition focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-dark-50'
        }`}
        placeholder="Vui lòng nhập email nhận mã thẻ"
        type="email"
        value={value}
        onChange={(event) => onChange(stripAccents(event.target.value))}
      />

      {error && <div className="mt-2 text-label-sm text-red-500">{error}</div>}
    </div>
  )
}
