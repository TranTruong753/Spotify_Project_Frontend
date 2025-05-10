import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { User } from "@/types";
import { loginWithGoogle } from "@/services/LoginGoogleServiec";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setUserFromGoogle } from "@/features/accounts/authSlice";

// Kiểu dữ liệu cho user trả về từ backend

export default function ButtonLoginGoogle() {

    const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()

    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential;

        if (!token) {
            return;
        }

        try {
            const data = await loginWithGoogle(token);

            console.log("data", data)

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch(setUserFromGoogle({
                user: data.user,
                accessToken: data.access,
                refreshToken: data.refresh,
            }));

            navigate("/")

        } catch (error: any) {
            console.error("Lỗi khi gọi API:", error);
            if (error.response?.data?.error) {

            } else {

            }
        }
    };

    return (


        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
                console.log("Đăng nhập thất bại");

            }}
            useOneTap={false}
            auto_select={false}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
            locale="vi"
            // disabled={loading}

            // width="300"
            type="standard"
            // flow="implicit"
            cancel_on_tap_outside={true}

        />



    );
}
