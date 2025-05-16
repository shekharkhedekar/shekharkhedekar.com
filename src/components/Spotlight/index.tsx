import { useEffect, useState } from 'react';

export const Spotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setPosition({ x: clientX - 100, y: clientY - 100 });
        };
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <div
            style={{
                backgroundColor: 'black',
                width: '100%',
                height: '100vh',
                color: 'black',
            }}
        >
            <div
                style={{
                    height: '200px',
                    width: '200px',
                    position: 'absolute',
                    top: position.y,
                    left: position.x,

                    background:
                        'radial-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(156, 156, 156, 1) 30%, rgba(0, 0, 0, 1) 75%)',
                    borderRadius: '50%',
                    zIndex: 1,
                }}
            />
            <div style={{ zIndex: 2, position: 'absolute', cursor: 'none' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                gravida, lectus sed pretium euismod, nisl nisi mattis neque, non
                egestas arcu ligula et urna. Integer at auctor nisi. Cras nunc
                eros, maximus in fermentum dignissim, eleifend sit amet sapien.
                Donec consectetur dolor leo, eu dignissim felis aliquet et. Sed
                suscipit et lacus a tempor. Nunc venenatis dignissim lacus nec
                suscipit. Nam non condimentum erat. Quisque semper eros erat,
                vel finibus mauris scelerisque ut. Etiam eu dapibus tellus. Ut
                ultricies tincidunt magna, ac faucibus ex placerat eget. Aliquam
                et felis maximus, pretium nunc vitae, volutpat dui. Vestibulum
                viverra arcu vel sapien hendrerit semper. Duis ut mattis augue,
                eget porttitor odio. Aliquam eget nunc eu mauris molestie
                pulvinar sed a tellus. Curabitur porta molestie sapien. Morbi ac
                eros tempor, efficitur neque at, placerat sem. Vivamus
                scelerisque nec dui ut molestie. Proin rhoncus, enim at
                fermentum tempus, lacus nisl laoreet mauris, ac luctus nisl odio
                non sapien. Sed aliquam, libero ultrices suscipit egestas, felis
                nulla consectetur felis, eget vestibulum metus tortor eget nibh.
                Aenean tempus gravida elit a consectetur. Sed a lectus est. Nam
                at justo ut ante feugiat laoreet eu at mi. Phasellus finibus
                risus augue, in tempor ex tincidunt ut. Phasellus elementum
                lectus ut augue vestibulum vulputate. Nunc in ultricies odio.
                Donec efficitur hendrerit nunc id tristique. Nulla eget dui eget
                ex tempus consequat. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. In eu commodo justo, quis rutrum sem. Ut id
                tortor neque. Aenean id iaculis arcu, at luctus nibh. Vestibulum
                rhoncus, velit at scelerisque efficitur, lectus risus viverra
                nisl, vel luctus urna odio nec neque. Suspendisse nec posuere
                sem. Nulla condimentum, dui vitae fermentum porta, metus orci
                lobortis risus, vel sodales massa orci elementum nulla. Praesent
                venenatis convallis ligula vel luctus. Curabitur sed lacus sit
                amet turpis porta mattis. Vivamus scelerisque risus nec molestie
                posuere. Duis nisi lectus, commodo at tristique at, porta a
                augue. Vestibulum pretium scelerisque ligula ut pellentesque.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Sed dapibus nibh justo, eu
                consequat ante euismod vel. Nunc pellentesque pulvinar luctus.
                Nam ultricies, tellus vel fringilla ultricies, est erat maximus
                ex, eget iaculis sapien ex sit amet arcu. Pellentesque a nisl ut
                leo iaculis maximus. Mauris venenatis neque lectus, blandit
                iaculis turpis bibendum sit amet. Cras molestie interdum velit,
                quis fringilla tortor imperdiet id. Maecenas dapibus iaculis
                hendrerit.
            </div>
        </div>
    );
};
