import path from '../ultils/path';
import icons from '../ultils/icons';

const {
    FaShieldAlt,
    BsCarFrontFill,
    PiGiftFill,
    GiReturnArrow,
    BsFillPhoneVibrateFill,
    LuLayoutDashboard,
    LiaUsersSolid,
    LiaProductHunt,
    LiaJediOrder,
    BsDash,
    CgProfile,
    MdOutlineHistoryToggleOff,
    PiHeartHalfDuotone,
    AiFillHome,
    MdOutlineProductionQuantityLimits,
    IoMdLogIn,
    MdOutlineAdminPanelSettings,
    IoLogOut,
} = icons;

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `${path.HOME}`,
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `${path.PRODUCTS}`,
    },
    // {
    //     id: 3,
    //     value: 'BLOGS',
    //     path: `${path.BLOGS}`,
    // },
    // {
    //     id: 4,
    //     value: 'OUT SERVICES',
    //     path: `${path.OUT_SERVICES}`,
    // },
    // {
    //     id: 5,
    //     value: 'FAQs',
    //     path: `${path.FAQS}`,
    // },
];

export const productEXtrainfo = [
    {
        icon: <FaShieldAlt size={22} />,
        name: 'Guarantee',
        des: 'Quality Checked',
    },
    {
        icon: <BsCarFrontFill size={22} />,
        name: 'Free Shipping',
        des: 'Free On All Products',
    },
    {
        icon: <PiGiftFill size={22} />,
        name: 'Special Gift Cards',
        des: 'Special Gift Cards',
    },
    {
        icon: <GiReturnArrow size={22} />,
        name: 'Free Return',
        des: 'Within 7 Days',
    },
    {
        icon: <BsFillPhoneVibrateFill size={22} />,
        name: 'Consultancy',
        des: 'Lifetime 24/7/356',
    },
];

export const productEXtrainfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        // des: `Technology: GSM / HSPA / LTE
        // Dimensions: 144.6 x 69.2 x 7.3 mm
        // Weight: 129 g
        // Display: IPS LCD 5.15 inches
        // Resolution: 1080 x 1920
        // OS: Android OS, v6.0 (Marshmallow)
        // Chipset: Snapdragon 820
        // CPU: Quad-core
        // Internal: 32GB/64GB/128GB
        // Camera: 16 MP, f/2.0 - 4 MP, f/2.0`,
    },
    {
        id: 2,
        name: 'WARRANTY',
        des: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
    },
    {
        id: 3,
        name: 'DELLIVERY',
        des: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
    },
];

export const colors = ['black', 'brown', 'gray', 'white', 'pink', 'yellow', 'orange', 'purple', 'green', 'blue'];

export const sorts = [
    {
        id: 1,
        value: '-sold',
        option: 'Best selling',
    },
    {
        id: 2,
        value: '-title',
        option: 'Alphabetically, A-Z',
    },
    {
        id: 3,
        value: 'title',
        option: 'Alphabetically, Z-A',
    },
    {
        id: 4,
        value: '-price',
        option: 'Price, high to low',
    },
    {
        id: 5,
        value: 'price',
        option: 'Price, low to high',
    },
    {
        id: 6,
        value: '-createdAt',
        option: 'Date, new to old',
    },
    {
        id: 7,
        value: 'createdAt',
        option: 'Price, old to new',
    },
];

export const voteOptions = [
    {
        id: 1,
        name: 'Terrible',
    },
    {
        id: 2,
        name: 'Bad',
    },
    {
        id: 3,
        name: 'Neutral',
    },
    {
        id: 4,
        name: 'Good',
    },
    {
        id: 5,
        name: 'Perfect',
    },
];

export const SIDEBARADMIN = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <LuLayoutDashboard size={20} />,
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
    },
    {
        id: 2,
        name: 'Manage User',
        icon: <LiaUsersSolid size={20} />,
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    },
    {
        id: 3,
        name: 'Manage Products',
        icon: <LiaProductHunt size={20} />,
        children: [
            {
                id: 5,
                name: 'Create Products',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
                icon: <BsDash />,
            },
            {
                id: 6,
                name: 'Manage Products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
                icon: <BsDash />,
            },
        ],
    },
    {
        id: 4,
        name: 'Manage Orders',
        icon: <LiaJediOrder size={20} />,
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    },
];

export const SIDEBARMEMBER = [
    {
        id: 1,
        name: 'Personal',
        icon: <CgProfile size={20} />,
        path: `/${path.MEMBER}/${path.PERSONAL}`,
    },
    {
        id: 2,
        name: 'Buy History',
        icon: <MdOutlineHistoryToggleOff size={20} />,
        path: `/${path.MEMBER}/${path.BUY_HISTORY}`,
    },
    {
        id: 3,
        name: 'Wishlist',
        icon: <PiHeartHalfDuotone size={20} />,
        path: `/${path.MEMBER}/${path.WHISHLIST}`,
    },
    // {
    //     id: 4,
    //     name: 'My Cart',
    //     icon: <FaOpencart size={20} />,
    //     path: `/${path.MEMBER}/${path.MY_CART}`,
    // },
];

export const roles = [
    {
        code: 1998,
        value: 'Admin',
    },
    {
        code: 2001,
        value: 'Member',
    },
];

export const isBlocked = [
    {
        code: false,
        value: 'Actived',
    },
    {
        code: true,
        value: 'Blocked',
    },
];

export const MENU = [
    {
        id: 1,
        icon: <AiFillHome size={20} />,
        name: 'Home',
        role: 2001,
        path: `/${path.HOME}`,
    },
    {
        id: 2,
        icon: <MdOutlineProductionQuantityLimits size={20} />,
        name: 'Products',
        role: 2001,
        path: `${path.PRODUCTS}`,
    },
    {
        id: 3,
        icon: <IoMdLogIn size={20} />,
        name: 'Login',
        role: 2001,
        path: `/${path.LOGIN}`,
    },
    {
        id: 4,
        icon: <CgProfile size={20} />,
        name: 'Detail Profile',
        role: 2001,
        path: `/${path.MEMBER}/${path.PERSONAL}`,
    },
    {
        id: 5,
        name: 'Buy History',
        role: 2001,
        icon: <MdOutlineHistoryToggleOff size={20} />,
        path: `/${path.MEMBER}/${path.BUY_HISTORY}`,
    },
    {
        id: 6,
        name: 'Wishlist',
        role: 2001,
        icon: <PiHeartHalfDuotone size={20} />,
        path: `/${path.MEMBER}/${path.WHISHLIST}`,
    },
    {
        id: 7,
        icon: <MdOutlineAdminPanelSettings size={20} />,
        name: 'Admin Workspace',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
    },
    {
        id: 8,
        name: 'Manage User',
        icon: <LiaUsersSolid size={20} />,
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    },
    {
        id: 9,
        name: 'Create Products',
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
        icon: <BsDash />,
    },
    {
        id: 10,
        name: 'Manage Products',
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
        icon: <BsDash />,
    },
    {
        id: 11,
        name: 'Manage Orders',
        icon: <LiaJediOrder size={20} />,
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    },
    {
        id: 12,
        icon: <IoLogOut />,
        name: 'Logout',
        role: 2001,
    },
];
