import { useNavigate } from 'react-router-dom'
import MainContainer from '../../components/common/MainContainer'
import Navbar from '../../components/common/Navbar'
import { useVerifyOTPPageState } from './VerifyOTPPage.state'

const VerifyOTPPage = () => {
    const navigate = useNavigate()
    const state = useVerifyOTPPageState()
    return (
        <>
            <Navbar
                universities={undefined}
                currentUniversityShortName={undefined}
            />
            <MainContainer>
                <div className="max-w-[300px] mx-auto text-center">
                    <p className="font-[Poppins] text-2xl select-none">
                        <span className="text-green">Ask</span>Senior
                    </p>
                    <p className="text-lg font-bold select-none text-gray">
                        กรุณากรอก OTP ที่ได้รับใน Email
                    </p>
                    {state.errorMessage != undefined && (
                        <p className="text-red-400 text-sm mt-[10px]">
                            {state.errorMessage}
                        </p>
                    )}
                    <input
                        onChange={(e) => {
                            state.setOTP({
                                value: e.target.value,
                            })
                        }}
                        placeholder="OTP รหัส 6 หลัก"
                        className="mt-[10px] transition ease-in-out mt-[6px] rounded-input text-sm w-full px-[14px] py-[10px] bg-[#F5F5F5] resize-none focus-visible:outline-none"
                    />
                    <button
                        onClick={() => {
                            state.verifyOTP({
                                otp: state.otp,
                                email: localStorage.getItem('userEmail') ?? '',
                                navigate,
                            })
                        }}
                        className="transition duration-500 ease-in-out hover:scale-[101%] mt-[15px] rounded-input text-sm w-full text-center px-[14px] py-[10px] bg-green text-white resize-none focus-visible:outline-none"
                    >
                        ยืนยัน OTP
                    </button>
                </div>
            </MainContainer>
        </>
    )
}
export default VerifyOTPPage
