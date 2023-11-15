import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getMoments, selectMoments, setCurrentPage, setMoments } from "../../../store/slises/momentsSlice";
import Moment from "./Moment";
import { selectCurrentPage } from "../../../store/slises/profileSlice";
import { useInView } from "react-intersection-observer";

const MomentsList: FC = () => {
    const moments = useAppSelector(selectMoments)
    const dispatch = useAppDispatch()
    const loadingStatus = useAppSelector(state => state.moments.status)
    const { ref, inView } = useInView({
        threshold: .01
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
            {loadingStatus === 'loading' && <h2>Loading...</h2>}
            {loadingStatus === 'failed' && <h2>Не удалось загрузить Ваши моменты...</h2>}
        </div>
        <div className="lower-bound" style={{height: '1000px', zIndex: -100, position: 'absolute' }} ref={ref}></div>
        </>
    )
}

export default MomentsList