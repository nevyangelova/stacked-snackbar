import React, {
    useState,
    useCallback,
    SyntheticEvent,
    useEffect,
    useRef,
} from 'react';
import {Snackbar as MUISnackbar} from '@mui/base/Snackbar';
import {SnackbarCloseReason} from '@mui/base/useSnackbar';
import {useSnackbar} from '../contexts/SnackbarContext';
import {useTheme} from '../contexts/ThemeContext';
import SnackbarRoot, {
    SnackbarLabel,
    SnackbarMessage,
    SnackbarContainer,
    CloseIcon,
    SnackbarParentContainer,
} from './SnackbarRoot';
import {
    SnackbarPosition,
    calculatePositionAndAnimation,
} from '../utils/SnackbarUtils';

/**
 * @property position - Defines the position of the Snackbar on the screen.
 * @property autoHideDuration - The duration in milliseconds to auto-hide the Snackbar.
 */
interface SnackbarProps {
    position?: SnackbarPosition;
    autoHideDuration?: number;
}

/**
 * The Snackbar component displays snackbars with options for customization.
 */
const Snackbar: React.FC<SnackbarProps> = ({
    position = 'top-left',
    autoHideDuration = 6000,
}) => {
    const {snackbars, removeSnackbar} = useSnackbar();
    const {darkMode} = useTheme();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [initialTranslateY, setInitialTranslateY] = useState<number | null>(
        null
    );

    /**
     * Handles the closing of a Snackbar.
     *
     * @param reason - The reason for closing the Snackbar, needed to override the default MUI component behaviour.
     * @param id - The ID of the Snackbar to close.
     */
    const handleClose = useCallback(
        (
            _: Event | SyntheticEvent<any, Event> | null,
            reason: SnackbarCloseReason,
            id: number
        ) => {
            if (reason === 'clickaway') {
                return;
            }
            removeSnackbar(id);
        },
        [removeSnackbar]
    );

    const handleMouseEnter = useCallback(() => {
        setExpanded(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setExpanded(false);
    }, []);

    const handleSnackbarMouseEnter = useCallback(
        (e: SyntheticEvent, id: number, translateY: number) => {
            e.stopPropagation();
            setHoveredId(id);
            setInitialTranslateY(translateY);
        },
        []
    );

    const handleSnackbarMouseLeave = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setHoveredId(null);
        setInitialTranslateY(null);
    }, []);

    /**
     * Handles hovering over the whole stack, prevents jumping if the parent height isn't sufficient
     * Needs work based on custom positions
     */
    const parentHeight = snackbars.length * 70 + 50;
    const totalStackHeight = snackbars.length * (60 + 10) - 10;

    /**
     * Handles control over timemout based on current hoverer element
     */
    const timeoutIds = useRef<{[id: number]: NodeJS.Timeout}>({});
    useEffect(() => {
        snackbars.forEach((snackbar) => {
            if (hoveredId === snackbar.id) {
                if (timeoutIds.current[snackbar.id]) {
                    clearTimeout(timeoutIds.current[snackbar.id]);
                }
            } else {
                // Clear any existing timeout for this snackbar to avoid duplicate timeouts
                if (timeoutIds.current[snackbar.id]) {
                    clearTimeout(timeoutIds.current[snackbar.id]);
                }

                timeoutIds.current[snackbar.id] = setTimeout(
                    () => removeSnackbar(snackbar.id),
                    autoHideDuration
                );
            }
        });

        // Cleanup
        return () => {
            Object.values(timeoutIds.current).forEach(clearTimeout);
        };
    }, [snackbars, hoveredId, removeSnackbar, autoHideDuration]);

    return (
        <SnackbarParentContainer
            parentHeight={parentHeight}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {snackbars.map((snackbar, index) => {
                const {isTop, translateYValue, scaleValue} =
                    calculatePositionAndAnimation(
                        index,
                        snackbars.length,
                        expanded,
                        hoveredId === snackbar.id,
                        initialTranslateY
                    );

                return (
                    <SnackbarRoot
                        key={snackbar.id}
                        type={snackbar.type}
                        expanded={expanded}
                        isTop={isTop}
                        darkMode={darkMode}
                        zIndexValue={index}
                        translateYValue={translateYValue}
                        scaleValue={scaleValue}
                        position={position}
                    >
                        <MUISnackbar
                            open={true}
                            onClose={(event, reason) =>
                                handleClose(event, reason, snackbar.id)
                            }
                            onMouseEnter={(e) =>
                                handleSnackbarMouseEnter(
                                    e,
                                    snackbar.id,
                                    translateYValue
                                )
                            }
                            onMouseLeave={handleSnackbarMouseLeave}
                        >
                            <SnackbarContainer>
                                {snackbar.leadingIcon && (
                                    <div>{snackbar.leadingIcon}</div>
                                )}
                                <div>
                                    {snackbar.label && (
                                        <SnackbarLabel>
                                            {snackbar.label}
                                        </SnackbarLabel>
                                    )}
                                    {snackbar.message && (
                                        <SnackbarMessage>
                                            {snackbar.message}
                                        </SnackbarMessage>
                                    )}
                                </div>
                                {snackbar.trailingAction && (
                                    <div>{snackbar.trailingAction}</div>
                                )}
                                <CloseIcon
                                    onClick={() => removeSnackbar(snackbar.id)}
                                >
                                    <i className='fa-solid fa-xmark'></i>
                                </CloseIcon>
                            </SnackbarContainer>
                        </MUISnackbar>
                    </SnackbarRoot>
                );
            })}
        </SnackbarParentContainer>
    );
};

export default React.memo(Snackbar);
