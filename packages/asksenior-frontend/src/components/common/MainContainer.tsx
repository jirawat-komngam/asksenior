const MainContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="max-w-[700px] my-[32px] mx-auto">{children}</div>
            <p className="text-center text-xs mb-[32px] text-gray">
                © Jirawat Komngam | AskSenior.co
            </p>
        </>
    )
}
export default MainContainer
