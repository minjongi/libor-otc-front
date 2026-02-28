import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="ptb-120">
                <div className="container">
                    <div className="text-center">
                        <div className="mb-4">
                            <Image
                                src="/images/libor-logo.png"
                                alt="libor"
                                width={232}
                                height={50}
                            />
                        </div>

                        <h2 className="mb-2">COMING SOON</h2>
                        <p>We’re putting the finishing touches on our new site.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
