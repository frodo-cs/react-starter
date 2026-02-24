import { createFileRoute } from '@tanstack/react-router'
import { EmailGate } from '@/features/auth/pages/email-gate'

export const Route = createFileRoute('/(auth)/email-gate')({
  component: EmailGate,
})
