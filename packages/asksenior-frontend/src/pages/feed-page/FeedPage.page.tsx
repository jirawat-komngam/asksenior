import { useEffect, useRef, useState } from 'react'
import { useFeedPageState } from './FeedPage.state'
import Navbar from '../../components/common/Navbar'
import MainContainer from '../../components/common/MainContainer'
import CommentIcon from '../../assets/svg/comment.svg'
import { useNavigate, useParams } from 'react-router-dom'

const FeedPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const state = useFeedPageState()
    const testRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (params.universityName == undefined) {
            navigate('/KMITL')
        }
        state.initializePage({
            universityName: params.universityName,
        })
    }, [params.universityName])

    const [startX, setStartX] = useState<number | undefined>(undefined)

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
            <MainContainer>
                {state.selectedUniversity == undefined ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="max-w-[490px] mx-auto">
                            <h3>{state.selectedUniversity.universityName}</h3>
                            <h3 className="text-gray">เธรด</h3>
                            <textarea
                                onChange={(e) => {
                                    state.setPostDescription({
                                        value: e.target.value,
                                    })
                                }}
                                placeholder="คุณสงสัยอะไร?"
                                className="transition ease-in-out mt-[6px] rounded-input text-sm h-[89px] w-full px-[14px] py-[10px] bg-[#F5F5F5] resize-none focus-visible:outline-none"
                            />
                            <select
                                style={{
                                    MozAppearance: 'none',
                                    WebkitAppearance: 'none',
                                    appearance: 'none',
                                }}
                                className="mt-[6px] rounded-input text-sm w-full px-[14px] py-[10px] bg-[#F5F5F5] resize-none focus-visible:outline-none"
                                onChange={(e) => {
                                    state.setSelectedFieldIDForCreatingPost({
                                        value: e.target.value,
                                    })
                                }}
                            >
                                <option>
                                    🎉 แท็กภาควิชา เช่น ภาควิชาฟิสิกส์
                                </option>
                                {state.selectedUniversity.faculties.map(
                                    (eachFaculty) => (
                                        <optgroup
                                            label={eachFaculty.facultyName}
                                        >
                                            {eachFaculty.fields.map(
                                                (eachFaculty) => (
                                                    <option
                                                        value={
                                                            eachFaculty.fieldID
                                                        }
                                                    >
                                                        {eachFaculty.fieldName}
                                                    </option>
                                                )
                                            )}
                                        </optgroup>
                                    )
                                )}
                            </select>
                            {localStorage.getItem('token') == undefined ? (
                                <button
                                    disabled={
                                        localStorage.getItem('token') ==
                                        undefined
                                    }
                                    className="transition duration-500 ease-in-out hover:scale-[101%] mt-[15px] rounded-input text-sm w-full text-center px-[14px] py-[10px] bg-black text-white resize-none focus-visible:outline-none"
                                >
                                    กรุณาเข้าสู่ระบบก่อนโพส
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        state.post({
                                            token:
                                                localStorage.getItem('token') ??
                                                '',
                                        })
                                    }
                                    className="transition duration-500 ease-in-out hover:scale-[101%] mt-[15px] rounded-input text-sm w-full text-center px-[14px] py-[10px] bg-green text-white resize-none focus-visible:outline-none"
                                >
                                    โพส
                                </button>
                            )}
                        </div>
                        <div
                            ref={testRef}
                            onMouseDown={(e) => {
                                console.log('down')
                                setStartX(e.pageX)
                            }}
                            onMouseMove={(e) => {
                                console.log('move')
                                if (startX == undefined) {
                                    return
                                }

                                const diff = Math.abs(startX - e.pageX)
                                if (e.pageX > startX) {
                                    testRef.current?.scrollBy(
                                        -(60 * (diff / 100)),
                                        0
                                    )
                                } else {
                                    testRef.current?.scrollBy(
                                        60 * (diff / 100),
                                        0
                                    )
                                }

                                setStartX(e.pageX)
                            }}
                            onMouseUp={() => {
                                console.log('up')
                                setStartX(undefined)
                            }}
                            onMouseLeave={() => {
                                console.log('up')
                                setStartX(undefined)
                            }}
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            className="cursor-grab select-none mt-[40px] rounded-input text-sm w-full px-[14px] bg-[#F5F5F5] resize-none focus-visible:outline-none overflow-x-auto flex flex-row"
                        >
                            {state.selectedUniversity.faculties.map(
                                (eachFaculty) => (
                                    <p
                                        onClick={() => {
                                            state.setFaculty({
                                                faculty: eachFaculty,
                                            })
                                        }}
                                        className={`${
                                            startX == undefined
                                                ? 'cursor-pointer'
                                                : 'cursor-grab'
                                        } ${
                                            eachFaculty.facultyID ==
                                                state.selectedFaculty
                                                    ?.facultyID && 'text-green'
                                        } hover:text-green inline-table min-w-[120px] text-center py-[15px]`}
                                    >
                                        {eachFaculty.facultyName}
                                    </p>
                                )
                            )}
                        </div>
                        <select
                            onChange={(e) => {
                                state.setFieldID({
                                    value: e.target.value,
                                })
                            }}
                            style={{
                                MozAppearance: 'none',
                                WebkitAppearance: 'none',
                                appearance: 'none',
                            }}
                            className="mt-[20px] rounded-input text-sm w-[160px] px-[14px] py-[10px] bg-[#F5F5F5] resize-none focus-visible:outline-none"
                        >
                            {state.selectedFaculty?.fields.map((eachField) => (
                                <option value={eachField.fieldID}>
                                    ภาควิชา{eachField.fieldName}
                                </option>
                            ))}
                        </select>
                        {state.posts?.data.postByFieldID.length == 0 && (
                            <p className="text-center text-gray text-sm mt-[5px]">
                                ไม่มีโพสในเธรดนี้
                            </p>
                        )}
                        {state.posts != undefined &&
                            state.posts.data.postByFieldID.map((eachPost) => (
                                <div
                                    onClick={() => {
                                        navigate(
                                            `/${params.universityName}/${eachPost.postID}`
                                        )
                                    }}
                                    style={{
                                        boxShadow:
                                            '0px 4px 78px rgba(0, 0, 0, 0.05)',
                                    }}
                                    className="cursor-pointer text-sm rounded-input mt-[20px] w-full px-[18px] py-[15px] bg-white transition duration-500 ease-in-out hover:scale-[102%]"
                                >
                                    <p>{eachPost.postDescription}</p>
                                    <div className="flex flex-row mt-[9px] text-green font-medium select-none">
                                        <img src={CommentIcon} />
                                        <p className="ml-[2px] text-xs">
                                            {eachPost.comments.length}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </>
                )}
            </MainContainer>
        </>
    )
}
export default FeedPage
