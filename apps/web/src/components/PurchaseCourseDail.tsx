import { Course, UserCourseDialogState } from '@repo/types'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader } from './ui/dialog';
import { useEffect, useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { BACKEND_URL } from '@/App';

interface Props {
    course: Course,
    setDialogState: React.Dispatch<React.SetStateAction<UserCourseDialogState>>

}
const PurchaseCourseDail = ({ course, setDialogState }: Props) => {
    const [formattedPrice, setFormattedPrice] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
        }).format(course?.price)
        setFormattedPrice(formatted);
    }, [course])

    const handlePay = async () => {
        try {
            setProcessing(true);
            await axios.get(`${BACKEND_URL}/course/${course.id}/purchase`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("crs_user_auth")}`
                }
            });
            await new Promise(r=>setTimeout(r, 2000));
            setDialogState("done");

        }
        catch  {
            toast.warning("Something went wrong");
            setProcessing(false);
        }


    }

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                {
                    course ?
                        <>
                            <DialogHeader>
                                <DialogTitle>Purchase Course</DialogTitle>
                                <DialogDescription>You are purchasing the following course</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center gap-4 p-2 rounded border border-slate-700 bg-slate-950/10">
                                    <Label className="text-xs text-gray-400">Course Id</Label>
                                    {course?.id}
                                </div>
                                <div className="flex items-center gap-4 p-2 rounded border border-slate-700 bg-slate-950/10">
                                    <Label className="text-xs text-gray-400">Title</Label>
                                    {course?.title}
                                </div>
                                <div className="flex items-center gap-4 border border-green-900 rounded p-2 w-fit bg-green-800/25">
                                    <Label className="text-xs text-gray-400">Price</Label>
                                    {formattedPrice}
                                </div>
                            </div>
                            <DialogFooter>
                                {
                                    processing ?
                                        <Button disabled>
                                            Processing
                                        </Button>
                                        :
                                        <Button onClick={handlePay}>
                                            <LockKeyhole /> Continue to Pay
                                        </Button>
                                }
                            </DialogFooter>
                        </>
                        :
                        <div>
                            Loading
                        </div>
                }
            </DialogContent>
        </>
    )
}

export default PurchaseCourseDail