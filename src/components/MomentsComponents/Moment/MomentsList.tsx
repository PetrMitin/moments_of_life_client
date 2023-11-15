import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getMoments, selectMoments, setCurrentPage, setMoments } from "../../../store/slises/momentsSlice";
import Moment from "./Moment";
import { selectCurrentPage } from "../../../store/slises/profileSlice";
import { useInView } from "react-intersection-observer";

const MomentsList: FC = () => {
    const moments = useAppSelector(selectMoments)
    const dispatch = useAppDispatch()
    const { ref, inView } = useInView({
        threshold: .5
    })

    useEffect(() => {
        return function() {
            dispatch(setCurrentPage(1))
            dispatch(setMoments([]))
        }
    }, [])

    useEffect(() => {
        if (inView) {
            if (moments.length) {
                dispatch(setCurrentPage())
            }
            dispatch(getMoments())
        }
    }, [inView, dispatch])

    return (
        <>
        <div className="moments-list">
            {moments.map(moment => <Moment key={moment.id} moment={moment} />)}
        </div>
        <div className="lower-bound" style={{height: '100px', zIndex: -100, position: 'absolute' }} ref={ref}></div>
        </>
    )
}

export default MomentsList