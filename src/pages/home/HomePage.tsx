import { ScrollArea } from '@/components/ui/scroll-area'

import React from 'react'
import SectionGrid from './components/SectionGrid'


const HomePage = () => {
  return (
    <main className='rounded-md overflow-hidden h-full dark:bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          {/* <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1> */}

          <div className='space-y-8'>
            <SectionGrid title='Dành cho bạn'  isLoading={false} />
            <SectionGrid title='Xu hướng'  isLoading={false} />
            {/*	<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} /> */}
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage