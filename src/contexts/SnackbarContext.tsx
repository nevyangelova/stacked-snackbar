import React, {
    createContext,
    useState,
    useContext,
    useMemo,
    useCallback,
    ReactNode,
} from 'react';

/**
 * Defines the options for a Snackbar notification.
 * 
 * @property message - The optional message content of the Snackbar.
 * @property label - The main label for the Snackbar.
 * @property type - Specifies the type of Snackbar ('error', 'info', or 'success').
 * @property trailingAction - Optional ReactNode to be displayed as the trailing action.
 * @property leadingIcon - Optional ReactNode to be used as the leading icon.
 */
interface SnackbarOptions {
    message?: string;
    label: string;
    type: 'error' | 'info' | 'success';
    trailingAction?: ReactNode;
    leadingIcon?: ReactNode;
}

/**
 * Extends SnackbarOptions to include data for rendering.
 * 
 * @property id - Unique identifier for each Snackbar.
 * @property isOpen - Indicates whether the Snackbar is currently open/visible.
 */
interface SnackbarData extends SnackbarOptions {
    id: number;
    isOpen: boolean;
}

/**
 * Defines the shape of the Snackbar context.
 * 
 * @property addSnackbar - Function to add a new Snackbar.
 * @property removeSnackbar - Function to remove an existing Snackbar by ID.
 * @property snackbars - Array of active Snackbar data objects.
 */
interface SnackbarContextType {
    addSnackbar: (options: SnackbarOptions) => void;
    removeSnackbar: (id: number) => void;
    snackbars: SnackbarData[];
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
);

let snackbarId = 0;

export const SnackbarProvider: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

    const addSnackbar = useCallback((options: SnackbarOptions) => {
        setSnackbars((prevSnackbars) => [
            ...prevSnackbars,
            {...options, id: ++snackbarId, isOpen: true},
        ]);
    }, []);

    const removeSnackbar = useCallback((id: number) => {
        setSnackbars((prevSnackbars) =>
            prevSnackbars.filter((snackbar) => snackbar.id !== id)
        );
    }, []);

    const value = useMemo(() => {
        return {addSnackbar, removeSnackbar, snackbars};
    }, [addSnackbar, removeSnackbar, snackbars]);

    return (
        <SnackbarContext.Provider value={value}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
