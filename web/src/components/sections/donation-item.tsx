'use client'

import { useState } from 'react'
import { Checkbox } from '../checkbox'
import { twMerge } from 'tailwind-merge'
import { CampaignItem } from '@/@types/Campaign'
import { CheckedState } from '@radix-ui/react-checkbox'

interface DonationItemProps {
  item: CampaignItem
  onItemToList: (item: CampaignItem) => void
}

export function DonationItem({ item, onItemToList }: DonationItemProps) {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(
    item.status === 'concluído',
  )

  function handleCheck(checked: CheckedState) {
    onItemToList(item)
    setChecked(checked)
  }

  return (
    <div
      className={twMerge(
        'flex min-w-fit items-center gap-14 rounded-2xl p-5 shadow',
        checked && item.status !== 'concluído' && 'ring-1 ring-green-600',
      )}
    >
      <div className="flex min-w-48 flex-1 items-center gap-5">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => handleCheck(checked)}
          disabled={item.status === 'concluído' || item.status === 'reservado'}
        />
        <span
          className={twMerge(item.status === 'concluído' && 'line-through')}
        >
          {item.name}
        </span>
      </div>

      <span
        className={twMerge(
          'min-w-24 text-center',
          item.status === 'concluído' && 'line-through',
        )}
      >{`${item.goal - item.amount_donated} ${item.measure}`}</span>

      <span
        className={twMerge(
          'min-w-24 rounded-lg border px-2 py-1 text-center text-xs font-medium capitalize',
          item.status === 'disponível' && 'border-zinc-700',
          item.status === 'reservado' && 'border-orange-600 text-orange-600',
          item.status === 'concluído' && 'border-green-600 text-green-600',
        )}
      >
        {item.status}
      </span>
    </div>
  )
}
