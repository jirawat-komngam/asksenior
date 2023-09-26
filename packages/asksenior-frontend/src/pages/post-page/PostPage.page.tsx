import { useEffect } from 'react'
import { usePostPageState } from './PostPage.state'
import Navbar from '../../components/common/Navbar'
import MainContainer from '../../components/common/MainContainer'
import CommentIcon from '../../assets/svg/comment.svg'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const params = useParams()
    const state = usePostPageState()

    useEffect(() => {
        state.initializePage({
            universityName: params.universityName,
            postID: params.postID,
        })
    }, [params.universityName])

    return (
        <>
            <Navbar
                universities={
                    state.universities == undefined
                        ? undefined
                        : state.universities.data.universities.map(
                              (eachUniversity) => ({
                                  universityShortName:
                                      eachUniversity.universityShortName,
                              })
                          )
                }
                currentUniversityShortName={
                    state.selectedUniversity == undefined
                        ? undefined
                        : state.selectedUniversity.universityShortName
                }
            />
            {!state.isNotFound && state.selectedPost == undefined ? (
                <p className="text-center text-gray mt-[10px]">Loading...</p>
            ) : state.isNotFound ? (
                <p className="text-center text-gray mt-[10px]">โพสนี้ถูกลบ</p>
            ) : (
                <>
                    <MainContainer>
                        <div
                            style={{
                                boxShadow: '0px 4px 78px rgba(0, 0, 0, 0.05)',
                            }}
                            className="cursor-pointer text-sm rounded-input mt-[20px] w-full px-[18px] py-[15px] bg-white transition duration-500 ease-in-out hover:scale-[102%]"
                        >
                            <p>{state.selectedPost!.postDescription}</p>
                            <div className="flex flex-row mt-[9px] text-green font-medium select-none">
                                <img src={CommentIcon} />
                                <p className="ml-[2px] text-xs">
                                    {state.selectedPost!.comments.length}
                                </p>
                            </div>
                        </div>
                        {state.selectedPost!.comments.map((eachComment) => (
                            <div
                                style={{
                                    boxShadow:
                                        '0px 4px 78px rgba(0, 0, 0, 0.05)',
                                }}
                                className="cursor-pointer text-sm rounded-input mt-[20px] w-full px-[18px] py-[15px] bg-white transition duration-500 ease-in-out hover:scale-[102%]"
                            >
                                <p>{eachComment.commentContent}</p>
                            </div>
                        ))}
                        <p className="mt-[20px]">แสดงความคิดเห็น</p>
                        <textarea
                            onChange={(e) => {
                                state.setCommentDescription({
                                    value: e.target.value,
                                })
                            }}
                            placeholder="คุณคิดอย่างไร?"
                            className="transition ease-in-out mt-[6px] rounded-input text-sm h-[89px] w-full px-[14px] py-[10px] bg-[#F5F5F5] resize-none focus-visible:outline-none"
                        />
                        <button
                            onClick={() =>
                                state.createComment({
                                    token: localStorage.getItem('token') ?? '',
                                })
                            }
                            disabled={
                                localStorage.getItem('token') == undefined
                            }
                            className={`transition duration-500 ease-in-out hover:scale-[101%] mt-[5px] rounded-input text-sm w-full text-center px-[14px] py-[10px] ${
                                localStorage.getItem('token') == undefined
                                    ? 'bg-black'
                                    : 'bg-green'
                            } text-white resize-none focus-visible:outline-none`}
                        >
                            {localStorage.getItem('token') == undefined
                                ? 'กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น'
                                : 'แสดงความคิดเห็น'}
                        </button>
                    </MainContainer>
                </>
            )}
        </>
    )
}
export default PostPage
