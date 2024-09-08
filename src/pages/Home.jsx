import React from "react";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import ListProduct from "../components/ListProduct";

const Home = () => {
    return (
        <>
            <div>
                <Slider />
                <OurPolicy />
                <ListProduct title="SÁCH MỚI" query="sorted-and-paged?sortBy=id&page=1&size=5&sortOrder=des" />
                <ListProduct title="SÁCH BÁN CHẠY" query="sorted-and-paged?sortBy=sold&page=0&size=5&sortOrder=desc" />
                <ListProduct title="MANGA - COMIC" query="sorted-and-paged/by-collection?size=5&collection=6" collection={6} />
                <ListProduct title="DORAEMON" query="sorted-and-paged/by-collection?size=5&collection=27" collection={27} />
            </div>
        </>
    )
}

export default Home