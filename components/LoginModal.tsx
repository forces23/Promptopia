import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getProviders, signIn } from '@node_modules/next-auth/react'
import { ClientSafeProvider, LiteralUnion } from '@node_modules/next-auth/lib/client'
import { BuiltInProviderType } from '@node_modules/next-auth/providers'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

interface LoginModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ open, setOpen }: LoginModalProps) => {
    // const [open, setOpen] = useState(true);
    const [providers, setProviders] = useState<Providers>(null);

    useEffect(() => { console.log("providers", providers) }, [providers]);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        fetchProviders();

        // setProviders(async() => {
        //     const res = await getProviders();
        //     return {
        //         props: {
        //             providers: res,
        //         },
        //     };
        // }
        // )
    }, []);

    if (!providers) {
        return null;
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                <div className="flex min-h-full items-center justify-center text-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white sm:p-6 sm:pb-4 flex flex-col w-full">
                            <div className="w-full">
                                <div className="sm:flex sm:items-start w-full">
                                    {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"> */}
                                    {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                                    {/* </div> */}
                                    <div className="sm:mt-0 sm:ml-4 w-full ">
                                        {/* <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Sign In
                                        </DialogTitle> */}
                                        <div className="mt-4 flex flex-col gap-y-5 w-full text-left">
                                            {/* Email Input */}
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="email" className="font-sans font-medium">Email</label>
                                                    <input type="email" id="email" name="email" required className="rounded-lg border-2 border-gray-700 px-3 py-2 focus:border-blue-400 focus:outline-none" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="password" className="font-sans font-medium">Password</label>
                                                    <input type="password" id="password" name="password" required className="rounded-lg border-2 border-gray-700 px-3 py-2 focus:border-blue-400 focus:outline-none" />
                                                </div>
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <label htmlFor="remember-me" className="flex items-center gap-2">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            className="rounded-lg"
                                                        />
                                                        <span>Remember me</span>
                                                    </label>
                                                    <button className="whitespace-nowrap text-sm text-blue-600 hover:underline">
                                                        Forgot Password?
                                                    </button>
                                                </div>
                                                <button className="bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-500" >Sign In</button>
                                            <div className="relative flex items-center py-2">
                                                <div className="flex-grow border-t border-gray-300"></div>
                                                <span className="mx-4 text-sm text-gray-500">OR</span>
                                                <div className="flex-grow border-t border-gray-300"></div>
                                            </div>
                                            <div className='flex justify-center'>
                                                {Object.values(providers).map((provider) => (
                                                    <div key={provider.name} className="mx-2" >
                                                        <button onClick={() => signIn(provider.id)} className="border rounded-lg px-4 py-2 flex items-center gap-2 font-medium">
                                                            {provider.name === "Google" && <FcGoogle size={32} />}
                                                            {provider.name === "GitHub" && <FaGithub size={32} />}
                                                            {provider.name}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {/* <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Deactivate
                            </button> */}
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default LoginModal