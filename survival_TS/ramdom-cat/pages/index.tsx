import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Pros = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Pros> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    //useEffect ( () => {
    //    fetchImage().then(( newImage ) => {
    //        setImageUrl(newImage.url); //画像URLの状態を更新する
    //        setLoading(false);//ローディング状態を更新する
    //    });
    //}, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他のヌッコも見る</button>
            <div className={styles.frame}>{ loading || <img src={imageUrl} className={styles.img}/>}</div>
        </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Pros> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};


type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};

fetchImage().then((image) => {
    console.log(image.url);
});