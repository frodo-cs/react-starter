import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Contact() {
  const { t } = useTranslation('general')

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center gap-2'>
          <CardTitle className='text-sm font-bold'>{t('layout.contact')}</CardTitle>
        </div>
        <CardDescription className='text-xs font-medium text-muted-foreground'>
          {t('layout.contact')}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-2'>{t('layout.contact')}</CardContent>
    </Card>
  )
}
