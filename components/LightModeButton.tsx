import lightModeAtom from "@/data/LightMode";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface LightModeButtonProps {
    className?: string;
}

/**
 * Light / dark mode toggle button component.
 * @returns 
 */
const LightModeButton: React.FC<LightModeButtonProps> = (props) => {
    const storageKeyName = 'lightMode';
    const [lightMode, setLightMode] = useAtom(lightModeAtom);

    useEffect(() => {
        // Get the stored lightMode value from localStorage.
        const lightMode = window.localStorage.getItem(storageKeyName);
        if (lightMode) {
            setLightMode(JSON.parse(lightMode));
        }
    })

    /**
     * Handle the onClick event on the toggle button.
     */
    function handleOnClick() {
        window.localStorage.setItem(storageKeyName, JSON.stringify(!lightMode));
        setLightMode(!lightMode);
    }

    /**
     * Render the button icon based on the lightMode state.
     * @returns 
     */
    function renderIcon() {
        if (lightMode) {
            return <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
        }

        return <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
    }

    return (
        <Button onClick={handleOnClick} {...props}>
            {renderIcon()}
        </Button>
    );
};

export default LightModeButton;