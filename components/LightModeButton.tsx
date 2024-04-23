import lightModeAtom from "@/data/LightMode";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";

const LightModeButton: React.FC = () => {
    const storageKeyName = 'lightMode';
    const [lightMode, setLightMode] = useAtom(lightModeAtom);

    useEffect(() => {
        const lightMode = window.localStorage.getItem(storageKeyName);
        if (lightMode) {
            setLightMode(JSON.parse(lightMode));
        }
    })

    function handleOnClick() {
        window.localStorage.setItem(storageKeyName, JSON.stringify(!lightMode));
        setLightMode(!lightMode);
    }

    function renderIcon() {
        if (lightMode) {
            return <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
        }

        return <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
    }

    return (
        <Button onClick={handleOnClick}>
            {renderIcon()}
        </Button>
    );
};

export default LightModeButton;