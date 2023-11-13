import styled, {css} from 'styled-components';
import {PSnackbarParent, PSnackbarRoot, colors} from '@/utils/SnackbarUtils';

export const SnackbarLabel = styled.div`
    font-weight: 500;
    margin-right: 10px;
    font-size: 14px;
`;

export const SnackbarMessage = styled.div`
    margin-right: 10px;
    font-size: 12px;
`;

export const SnackbarContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem 1rem;
    height: 46px;
`;

export const SnackbarParentContainer = styled.div<PSnackbarParent>`
    height: ${(props) => `${props.parentHeight}px`};
    width: 400px;
    margin-top: -10rem;
    padding: 2rem;
`;

export const CloseIcon = styled.span`
    cursor: pointer;
    position: absolute;
    top: -9px;
    left: -6px;
    width: 16px;
    height: 16px;
    text-align: center;
    cursor: pointer;
    display: none;
    border-radius: 50px;
    font-size: 12px;
`;

/**
 * Creates a CSS rule set based on the provided Snackbar properties.
 * @param props - Snackbar properties
 * @returns A styled-components CSS template literal
 */
const ruleSet = (props: PSnackbarRoot) => {
    const {
        type,
        expanded,
        darkMode,
        zIndexValue,
        translateYValue,
        scaleValue,
        position = 'top-left',
    } = props;

    const selectedMode = darkMode ? 'dark' : 'light';
    const verticalSpacing = expanded ? '1rem' : '0';

    const hoverStyles = css`
        &:hover {
            background-color: ${colors[selectedMode][type].hover};
            transition: background-color 0.3s ease-in-out;

            ${CloseIcon} {
                display: block;
                color: ${colors[selectedMode][type].text};
                background-color: ${colors[selectedMode][type].background};
                border: 1px solid ${colors[selectedMode][type].hover};
            }
        }
    `;

    let positionStyles = '';
    switch (position) {
        case 'top-left':
            positionStyles = 'left: 10;';
            break;
        case 'top-right':
            positionStyles = 'right: 10;';
            break;
        case 'top-center':
            positionStyles = 'left: 0; right: 0; margin: 0 auto;';
            break;
        default:
            positionStyles = 'left: 10;';
            break;
    }

    const animationStyles = css`
        animation: slideDown 0.3s ease-in;

        @keyframes slideDown {
            from {
                top: 0;
            }
            to {
                top: calc(50px + ${translateYValue}px);
            }
        }
    `;

    return css`
        z-index: ${zIndexValue};
        border: 1px solid ${colors[selectedMode][type].hover};
        position: fixed;
        top: calc(50px + ${translateYValue}px);
        ${positionStyles}
        margin-bottom: ${verticalSpacing};
        transform: scale(${scaleValue});
        transition: transform 0.3s ease-in-out, top 0.3s ease-in-out,
            margin-bottom 0.3s ease-in-out;
        background-color: ${colors[selectedMode][type].background};
        color: ${colors[selectedMode][type].text};
        width: ${position === 'top-center' ? '80%' : '100%'};
        max-width: 400px;
        min-height: 60px;
        border-radius: 4px;
        font-family: 'Poppins', sans-serif;
        box-shadow: 1px 2px 3px rgba(24, 24, 24, 0.2);
        ${hoverStyles}
        ${animationStyles}
    `;
};

const SnackbarRoot = styled.div
    .attrs<PSnackbarRoot>((props) => ({
        className: `${props.expanded ? 'expanded' : ''}`,
    }))
    .withConfig({
        shouldForwardProp: (property) =>
            ![
                'type',
                'expanded',
                'isTop',
                'darkMode',
                'zIndexValue',
                'translateYValue',
                'scaleValue',
                'position',
            ].includes(property),
    })`
  ${(props: PSnackbarRoot) => ruleSet(props)}
`;

export default SnackbarRoot;
