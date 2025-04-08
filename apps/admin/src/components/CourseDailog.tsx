import { Course, CourseDailogState } from '@repo/types'
import React from 'react'
import { Dialog} from './ui/dialog'

import ViewCourseDail from './ViewCourseDail'
import DeleteCourseDail from './DeleteCourseDail'
import EditCourseDail from './EditCourseDail'
import CreateCourseDail from './CreateCourseDail'
import { useSearchParams } from 'react-router-dom'

interface Props {
    dailogVisible: boolean,
    setDailogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    activeCourse: Course,
    dialogState: CourseDailogState,

}

const CourseDailog = ({ dailogVisible, setDailogVisible, activeCourse, dialogState }: Props) => {
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
                            <ViewCourseDail course={activeCourse}/>
                    }
                    {
                        dialogState == "delete" && 
                            <DeleteCourseDail course={activeCourse} setDialogVisible={setDailogVisible}/>
                    }
                    {
                        dialogState == "edit" && 
                            <EditCourseDail course={activeCourse} setDialogVisible={setDailogVisible}/>
                    }
                    {
                        dialogState == "create" &&
                            <CreateCourseDail setDialogVisible={setDailogVisible}/>
                    }
                </Dialog>
            }
        </>
    )
}

export default CourseDailog