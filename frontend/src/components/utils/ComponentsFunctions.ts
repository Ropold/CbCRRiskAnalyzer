import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export function onFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void
) {
    if (e.target.files) {
        const file = e.target.files[0];
        setImage(file);
    }
}

export function onImageCancel(setImage: (file: File | null) => void) {
    setImage(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
}

export function formatDate(dateString: string | undefined): string {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString('de-DE');
}

export const useAutoScrollToTop = () => {
    const location = useLocation();
    useEffect(() => window.scroll(0, 0), [location]);
};