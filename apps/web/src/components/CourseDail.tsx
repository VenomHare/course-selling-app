import { Course, UserCourseDialogState } from '@repo/types'
import React from 'react'
import { Dialog} from './ui/dialog'

import { useSearchParams } from 'react-router-dom'
import ViewCourseDail from './ViewCourseDial'
import PurchaseCourseDail from './PurchaseCourseDail'
import PurchaseDone from './PurchaseDone'

interface Props {
    dailogVisible: boolean,
    setDailogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    activeCourse: Course,
    dialogState: UserCourseDialogState,
    setDialogState: React.Dispatch<React.SetStateAction<UserCourseDialogState>>
    purchases: number[]

}

const CourseDailog = ({ dailogVisible, setDailogVisible, activeCourse, dialogState, setDialogState, purchases }: Props) => {
    const [_, setQuery] = useSearchParams();
    
    return (
        <>
            {
                <Dialog open={dailogVisible} onOpenChange={(o)=>{
                    setDailogVisible(o);
                    if (!o)
                    {
                        setQuery("");
                    }
                }} >
                    {
                        dialogState == "view" &&
                            <ViewCourseDail course={activeCourse} setDialogState={setDialogState} purchases={purchases}/>
                    }
                    {
                        dialogState == "purchase" &&
                            <PurchaseCourseDail course={activeCourse} setDialogState={setDialogState} />
                    }
                    {
                        dialogState == "done" && 
                            <PurchaseDone course={activeCourse}/>
                    }
                    
                </Dialog>
            }
        </>
    )
}

export default CourseDailog