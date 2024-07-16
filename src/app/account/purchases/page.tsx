import { getOrders } from '@/api';
import { PurchasesData } from './purchasesType';
import SinglePurchase from './SinglePurchase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

const Purchases = async () => {
    const session = await getServerSession(authOptions);
    const userEmail: string =
        session?.user?.email !== undefined ? session?.user?.email : '';
    const InfoAboutPurchase = await getOrders(userEmail);
    console.log(InfoAboutPurchase);
    

    return (
        <div className="w-full">
            <h2 className="w-full hidden md:flex text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
                Мої замовлення
            </h2>
            <div className="mx-auto w-full text-TechStopBlue">
                {InfoAboutPurchase !== undefined &&
                    (InfoAboutPurchase.length > 0 ? (
                        InfoAboutPurchase?.reverse().map(
                            (purchases: PurchasesData) => {
                                console.log(purchases);

                                return (
                                    <SinglePurchase
                                        purchases={purchases}
                                        key={purchases.orderCode}
                                    />
                                );
                            }
                        )
                    ) : (
                        <div>Not found</div>
                    ))}
            </div>
        </div>
    );
};

export default Purchases;
