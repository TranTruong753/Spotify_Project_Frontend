import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title?: string;
  songs?: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
        <Button variant='link' className='text-sm text-zinc-400 dark:hover:text-white cursor-pointer'>
          Hiển thị tất cả
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* <div className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'>
        </div> */}
        <CardSongs/>
        <CardSongs/>
        <CardSongs/>
        <CardSongs/>
       
      </div>
    </div>

  )
}

type CardSongsProps = {
  song?: Song; // Đặt dấu ? để không bắt buộc truyền song
};

const CardSongs = ({song}: CardSongsProps) => {
  return (
    <Card className="group relative transition-all duration-300 ease-in-out p-4 border-0 hover:shadow-xl hover:scale-105 cursor-pointer gap-2 ">
      <CardContent className="p-0 rounded-sm overflow-hidden ">
        <img className=" w-full aspect-square rounded-sm object-cover" src="https://phapluatxahoi.kinhtedothi.vn/stores/news_dataimages/thanhthuyplxh/032021/07/13/4443_cam-am-sao-truc-em-cua-ngay-hom-qua.jpg?rt=20210307134445" alt="" />
        <div className="mt-3">
          <h3 className='font-medium mb-2 truncate'>Em của ngày hôm qua</h3>
          <p className='text-sm text-zinc-400 truncate'>Sơn tùng MTP</p>
        </div>
      </CardContent>
        <PlayButton />

    </Card>
  )
}

export default SectionGrid