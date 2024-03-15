/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import {useState} from "react";

export default function EditMyProfile({showModal, setShowModal}:any)
{
    const [email, setEmail] = useState<any>("email");
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState("bio");
    const [avatar, setAvatar] = useState<any>(null);

    const editMyProfile = async (e: { preventDefault: () => void; }) =>
    {
        let editedProfile = new FormData()
        editedProfile.append('email', email ? email : "email")
        editedProfile.append('username', username ? username : "username")
        editedProfile.append('user', "user")
        editedProfile.append('bio', bio ? bio : "bio")
        if(avatar !== null)
        {
            editedProfile.append('avatar', avatar)
        }
        e.preventDefault()
        // dispatch(editMyProfileAction(editedProfile))
        window.location.reload()
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <form onSubmit={editMyProfile}>
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input type="email" name="email" id="email"
                                                       defaultValue={"email"}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                       placeholder=" " required={true}/>
                                                <label htmlFor="email"
                                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                                    address</label>
                                            </div>
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input type="text" name="username" id="username"
                                                       defaultValue={"username"}
                                                       onChange={(e) => setUsername(e.target.value)}
                                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                       placeholder=" " required={true}/>
                                                <label htmlFor="username"
                                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                                            </div>
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="text" name="floating_first_name" id="floating_first_name"
                                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                           placeholder=" " required/>
                                                    <label htmlFor="floating_first_name"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="text" name="floating_last_name" id="floating_last_name"
                                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                           placeholder=" " required/>
                                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last  name</label>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <label
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                        htmlFor="profile">Profile Photo</label>
                                                    <input
                                                        // defaultValue={my_profile?.avatar}
                                                        accept='image/*'

                                                        onChange={(e) =>
                                                        {
                                                            const files = e.target.files;
                                                            if (files && files.length > 0)
                                                            {
                                                                setAvatar(files[0]);
                                                            }
                                                        }}
                                                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                                                        id="image_cover" type="file" required={false}/>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                </div>
                                            </div>
                                            <div className="relative z-0 mb-6 w-full group">
                                            <textarea id="message" rows={3}
                                                      defaultValue={"bio"}
                                                      onChange={(e) => setBio(e.target.value)}
                                                      className="block mb-3 px-0 w-full text-normal text-gray-800 bg-white border-0 "
                                                      placeholder="Tell us about yourself..."/>
                                                <button type="submit"
                                                        className="inline-flex float-right mt-0 items-center px-6 py-3 text-sm font-bold text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Update
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}