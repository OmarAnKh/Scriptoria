import toast from "react-hot-toast"
const Share = ({ t }) => {
    const shareHandler = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                })
            } else {
                await navigator.clipboard.writeText(window.location.href)
                toast.success("Link copied to clipboard!")
            }
        } catch (error) {
            toast.error("Couldn't share the link.")
        }
    }
    return (
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto d-flex flex-column align-items-center`} onClick={shareHandler}>
                <i className="bi bi-share-fill" style={{ color: 'white', cursor: 'pointer', justifySelf: 'center', fontSize: '2rem', verticalAlign: 'middle' }}></i>
                <h6 className="text-white icon-title"> {t("StoryHeader.Share")} </h6>
            </span>
        </span>
    );
}

export default Share;
