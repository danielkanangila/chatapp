import { useDispatch, useSelector } from "react-redux";
import { setVisibilityAction } from "../store/windowVisibility"

export const useWindowVisibility = () => {
    const isWindowVisible = useSelector(state => state.windowVisibility.isWindowVisible);
    const dispatch = useDispatch();

    const updateVisibility = () => dispatch(setVisibilityAction(!isWindowVisible));

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

    return {
        isWindowVisible,
        updateVisibility,
        isInViewport
    }
}