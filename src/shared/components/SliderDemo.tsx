import Carousel from 'react-elastic-carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/slider.css';

function Slider(props: any) {
    console.log(props)
    const title = (props?.title ?
        props.title.split(/\\n/g).map((text: string, index: number) => {
            return (
                <h1 className='slider-title' key={index}>
                    {text}
                </h1>
            )
        })
        :
        <></>
    )
    return (
        <div className='slider-background p-3'>
            {title}
            <Carousel
                isRTL
                enableSwipe={true}
                enableAutoPlay={true}
                itemPadding={[30]}
                itemsToShow={3}
            >
                {props.children}
            </Carousel>
        </div>
    )
}

const randomImages = (no: number) => Array.from({ length: no },
    (_, index) =>
        <img
            className='slider-image'
            src={`https://loremflickr.com/200/300/${(Math.random() * 1000).toFixed(0)}`}
            key={index}
        />
)

const SliderDemo = () => {
    return (
        <>
                {/* initialize with property text set to dummy */}
                <Slider title="OSUT te informeaza\n(slider articole importante pentru studenti)">
                    {randomImages(30)}
                </Slider>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac ultricies ante. Sed euismod, nisl nec ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
                Nulla facilisi. Donec auctor, nisl eget ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac ultricies ante. Sed euismod, nisl nec ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
                Nulla facilisi. Donec auctor, nisl eget ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac ultricies ante. Sed euismod, nisl nec ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
                Nulla facilisi. Donec auctor, nisl eget ultricies tincidunt,
                mauris nisl aliquet nunc, eget aliquam lectus justo vel nisl.
            </p>
        </>
    );
}

export default SliderDemo;