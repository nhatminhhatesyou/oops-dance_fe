import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'

import ami_img from '../../Assets_HomePage/ami_rmbg.png'
import bin_img from '../../Assets_HomePage/bin_rmbg.png'
import dolinh_img from '../../Assets_HomePage/dolinh_rmbg.png'
import chaeng_img from '../../Assets_HomePage/chaeng_rmbg.png'
import ducbo_img from '../../Assets_HomePage/ducbo_rmbg.png'

const instructors = [
    { name: "Ami", description: "Ami is a renowned K-pop choreographer.", image: ami_img },
    { name: "Bin", description: "Bin is a leading expert in trending dance styles.", image: bin_img },
    { name: "Do Linh", description: "Do Linh specializes in contemporary dance.", image: dolinh_img },
    { name: "Chaeng", description: "Chaeng is known for her innovative dance techniques.", image: chaeng_img },
    { name: "Duc Bo", description: "Duc Bo is a pioneer in modern dance.", image: ducbo_img },
];

const Instructor = () => {
    return (
        <div className='intructorInfoHomePage container section flex'>
            <div className="sectionContainer">
                <div className="headerDiv flex flex-col gap-3">
                    <h1 className='text-4xl font-bold'>Crafted by Dance Innovators</h1>
                    <h3 className='text-2xl font-light w-1/2'>Our K-pop, trending, and other dance classes and programs are meticulously crafted by leading pioneers in dance styles and acclaimed choreographers.</h3>
                </div>
                <div className="cardsDiv grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {instructors.map((instructor, index) => (
                        <Card key={index} hoverable clickable>
                            <CardBody css={{ p: 0 }}>
                                <Image
                                    src={instructor.image}
                                    objectFit="cover"
                                    width="100%"
                                    height={140}
                                    alt={instructor.name}
                                />
                            </CardBody>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">{instructor.name}</h4>
                                <p className="text-sm text-gray-600">{instructor.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Instructor