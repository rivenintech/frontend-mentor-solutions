import { useStore } from "@nanostores/react";
import { cartItems, removeItem } from "../cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import { ConfirmationModal } from "./confirmation-modal";

export function Cart() {
    const $cartItems = Object.values(useStore(cartItems));
    const totalItems = $cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    return (
        <>
            <h2 className="text-red mb-2 text-2xl font-black">Your Cart ({totalItems})</h2>
            {$cartItems.length ? (
                <div>
                    <ul>
                        {$cartItems.map((cartItem) => (
                            <li key={cartItem.name} className="flex items-center justify-between border-b border-rose-100 py-5">
                                <div>
                                    <p className="font-semibold text-rose-900">{cartItem.name}</p>
                                    <p className="mt-2 flex gap-4">
                                        <span className="text-red font-semibold">{cartItem.quantity}x</span>
                                        <span className="text-rose-400">@ {formatCurrency(cartItem.price)}</span>
                                        <span className="font-semibold text-rose-500">{formatCurrency(cartItem.price * cartItem.quantity)}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeItem(cartItem.name)}
                                    type="button"
                                    className="rounded-full border-2 border-rose-400 p-[5px] text-rose-400 duration-200 hover:border-rose-900 hover:text-rose-900"
                                >
                                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 10 10">
                                        <title>Remove item from cart</title>
                                        <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="my-6 flex items-center justify-between">
                        <p>Order Total</p>
                        <p className="text-2xl font-bold">
                            {formatCurrency($cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))}
                        </p>
                    </div>
                    <div className="my-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <title>Carbon neutral icon</title>
                            <path
                                fill="#1EA575"
                                d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
                            />
                            <path
                                fill="#1EA575"
                                d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
                            />
                        </svg>
                        <p>
                            This is a <span className="font-semibold">carbon-neutral</span> delivery
                        </p>
                    </div>
                    <ConfirmationModal />
                </div>
            ) : (
                <>
                    <img src="./assets/images/illustration-empty-cart.svg" alt="empty cart icon" className="mx-auto" width="128" height="128" />
                    <p className="text-center text-sm font-semibold text-rose-400">Your added items will appear here</p>
                </>
            )}
        </>
    );
}
