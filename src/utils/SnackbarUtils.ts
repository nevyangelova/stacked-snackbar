/**
 * Snackbar positions are limited to the top of the screen in this use case.
 * Based on UX research, this approach aligns with the vertical expansion of the stack.
 */
export type SnackbarPosition = 'top-left' | 'top-right' | 'top-center';

/**
 * @property isTop - Indicates if this Snackbar is the topmost in the stack.
 * @property translateYValue - The vertical position of the Snackbar in pixels.
 * @property scaleValue - The scaling factor for Snackbar animation.
 */
export interface CalculatedSnackbarData {
    isTop: boolean;
    translateYValue: number;
    scaleValue: number;
}

/**
 * @property type - Specifies the type of Snackbar ('error', 'info', or 'success').
 * @property expanded - Indicates whether the Snackbar is expanded.
 * @property isTop - Indicates if this Snackbar is the topmost in the stack.
 * @property darkMode - Specifies if dark mode is active.
 * @property zIndexValue - Specifies the stack order of the Snackbar.
 * @property translateYValue - The vertical position of the Snackbar.
 * @property scaleValue - The scaling factor for Snackbar animation.
 * @property position - Specifies the screen position of the Snackbar (optional).
 */
export interface PSnackbarRoot {
    type: 'error' | 'info' | 'success';
    expanded: boolean;
    isTop: boolean;
    darkMode: boolean;
    zIndexValue: number;
    translateYValue: number;
    scaleValue: number;
    position?: SnackbarPosition;
}

export interface PSnackbarParent {
    parentHeight: number;
}

// Preset colors for Snackbar types depending on theme
export const colors = {
    light: {
        error: {background: '#ffe1e2', text: '#6c2a2a', hover: '#edadaf'},
        info: {background: '#f6f8ff', text: '#4e5866', hover: '#c6c7cb'},
        success: {background: '#f1ffea', text: '#3b5e3d', hover: '#e1eedb'},
    },
    dark: {
        error: {background: '#5e2c2c', text: '#f8dcda', hover: '#4d2424'},
        info: {background: '#4b6272', text: '#d1d1d1', hover: '#394a56'},
        success: {background: '#3a5947', text: '#d4ded4', hover: '#2e4738'},
    },
};

/**
 * Calculates various properties for Snackbar positioning and animation.
 *
 * @param index - The index of the current Snackbar in the stack
 * @param totalSnackbars - The total number of active Snackbars
 * @param expanded - Indicates if the Snackbar is expanded
 *
 * @returns CalculatedSnackbarData object containing:
 * - isTop: Whether this Snackbar is at the top of the stack
 * - translateYValue: The Y-axis translation value for the Snackbar's position
 * - scaleValue: The scaling value for Snackbar animation
 *
 * * translateYValue Calculation:
 * - If expanded, each Snackbar is spaced 80 pixels apart to accommodate the expanded content. Snackbars are 70px tall.
 * - If not, they are spaced 10 pixels apart to minimize screen real estate.
 *
 * scaleValue Calculation:
 * - If the Snackbar is topmost or expanded, no scaling is applied (scaleValue = 1).
 * - Otherwise, each underlying Snackbar is reduced by a scale factor of 0.03.
 */

export const calculatePositionAndAnimation = (
    index: number,
    totalSnackbars: number,
    expanded: boolean,
    isHovered: boolean,
    initialTranslateY: number | null
): CalculatedSnackbarData => {
    // Determines whether this Snackbar is the topmost one in the stack
    const isTop = index === totalSnackbars - 1;

    // Reversed index for translateY calculation
    const reverseIndex = totalSnackbars - 1 - index;

    // Calculates Y-axis translation value.
    // If expanded, each Snackbar is moved 80 units apart. Otherwise, 10 units apart.
    let translateYValue = expanded ? reverseIndex * 80 : 10 * reverseIndex;
    // if its hovered, need to keep the snackbar at its initial position for improved UX.
    if (isHovered && initialTranslateY !== null) {
        translateYValue = initialTranslateY;
    }
    // Calculates the scale value for animation.
    // If the Snackbar is the topmost or is expanded, no scaling is applied.
    const scaleValue = isTop || expanded ? 1 : 1 - 0.03 * reverseIndex;

    return {
        isTop,
        translateYValue,
        scaleValue,
    };
};
