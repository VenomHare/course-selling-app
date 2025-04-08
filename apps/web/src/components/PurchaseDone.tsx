import { useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Course } from '@repo/types';
interface Props {
    course: Course
}

const PurchaseDone = ({ course }: Props) => {
    useEffect(() => {
        const soundEffect = new Audio("https://cdn.freesound.org/previews/456/456965_6456158-lq.ogg");
        soundEffect.play();
    }, [])
    return (
        <DialogContent className="sm:max-w-[425px] flex flex-col gap-4 items-center text-center">
            <VisuallyHidden>
                <DialogHeader>
                    <DialogTitle>Purchase Complete</DialogTitle>
                </DialogHeader>
            </VisuallyHidden>
            <DotLottieReact
                src="https://assets-v2.lottiefiles.com/a/539bfca2-1161-11ee-b51b-1320215f9715/CUOq0QnxIp.lottie"
                autoplay
            />
            <h3 className='text-3xl font-bold text-green-400'>Payment Successful </h3>
            <p className='text-xl font-semibold text-gray-300 mt-3'>You successfully purchased</p>
            <p className='text-2xl font-semibold mb-4'>{course?.title}</p>
        </DialogContent>
    )
}

export default PurchaseDone