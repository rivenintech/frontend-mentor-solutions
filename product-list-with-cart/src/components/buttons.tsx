import { useStore } from "@nanostores/react";
import { type RawItem, cartItems, decrementItemQuantity, incrementItemQuantity } from "../cartStore";

export function ItemImgWithBtn({ item }: { item: RawItem }) {
    const $cartItems = useStore(cartItems);
    const currentItem = $cartItems[item.name];

    return (
        <>
            <img
                src={item.image.desktop}
                srcSet={`${item.image.mobile} 375w, ${item.image.tablet} 768w, ${item.image.desktop} 1440w`}
                sizes="(max-width: 375px) 375px, (max-width: 768px) 768px, 1440px"
                className={`rounded-lg border-2 ${currentItem?.quantity ? "border-red" : "border-transparent"}`}
                alt={item.name}
                width="502"
                height="408"
            />
            <div className="absolute -bottom-5 w-full">
                <div className="mx-auto w-[60%]">
                    <AddToCartBtn item={item} quantity={currentItem?.quantity} />
                </div>
            </div>
        </>
    );
}

export function AddToCartBtn({ item, quantity }: { item: RawItem; quantity?: number }) {
    if (quantity) {
        return (
            <div className="bg-red flex items-center justify-between gap-2 rounded-full px-4 py-2 font-semibold text-white duration-200">
                <button
                    onClick={() => decrementItemQuantity(item.name)}
                    type="button"
                    className="hover:text-red rounded-full border-2 border-white px-0.5 py-1.5 duration-200 hover:bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2">
                        <title>Decrease quantity</title>
                        <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                </button>
                {quantity}
                <button
                    onClick={() => incrementItemQuantity(item)}
                    type="button"
                    className="hover:text-red rounded-full border-2 border-white p-0.5 duration-200 hover:bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                        <title>Increase quantity</title>
                        <path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => incrementItemQuantity(item)}
            type="button"
            className="hover:border-red hover:text-red flex w-full items-center justify-center gap-2 rounded-full border border-rose-500 bg-white py-2 font-semibold duration-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                <title>Shopping cart icon</title>
                <g fill="#C73B0F" clipPath="url(#a)">
                    <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                    <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                    </clipPath>
                </defs>
            </svg>
            Add to Cart
        </button>
    );
}
