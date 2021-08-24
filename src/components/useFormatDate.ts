import { useTranslation } from "next-translate";
import { useEffect, useState } from "react";

const useFormatDate = (date: string) => {
    const [formatDate, setFormatDate] = useState("");
    const { lang } = useTranslation();
    useEffect(() => {
        const month = new Date(date).toLocaleString(lang === "zh" ? "zh-TW" : lang, {
            month: "short",
        });
        setFormatDate(`${month} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`);
    }, [date, lang]);
    return formatDate;
};
export default useFormatDate;
