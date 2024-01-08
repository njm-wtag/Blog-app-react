const mockAuthors = [
  {
    id: 1,
    name: "John Doe",
    subtitle: "Web Developer",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profileImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&usqp=CAU`,
  },
  {
    id: 2,
    name: "Jane Smith",
    subtitle: "Graphic Designer",
    about:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    profileImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&usqp=CAU`,
  },
  {
    id: 3,
    name: "Bob Johnson",
    subtitle: "Content Writer",
    about:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    profileImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&usqp=CAU`,
  },
];

const mockCategories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Poetry" },
  { id: 3, name: "Films" },
  { id: 4, name: "World politics" },
];

const mockBlogs = [
  {
    id: 1,
    title:
      "The Impact of Technology on the Workplace: How Technology is Changing",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: 1,
    categoryId: 1,
    createdAt: "2022-01-01",
    bannerImage: `https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg`,
  },
  {
    id: 2,
    title: "Fast growth of IOT devices in Bangladesh",
    content: "Quisque eget metus vel libero blandit varius vitae eu libero.",
    authorId: 2,
    categoryId: 2,
    createdAt: "2022-02-15",
    bannerImage: `https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg`,
  },
  {
    id: 3,
    title: "Embracing the Revolution of Technology in Employment",
    content:
      "Ut euismod mi vitae velit fringilla, in posuere turpis hendrerit.",
    authorId: 3,
    categoryId: 3,
    createdAt: "2022-03-20",
    bannerImage: `https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg`,
  },
];

export { mockAuthors, mockCategories, mockBlogs };
