import { createContext, useState } from "react";

const TempStories = [
    {
        id: "1",
        user_id: "1",
        title: "TIFU by buying everyone an AncestryDNA kit and ruining Christmas",
        content: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents.Today my family got together to exchange presents for our Christmas Eve tradition, and I gave my mom, dad, brother, and 2 sisters each a kit. As soon as everyone opened their gift at the same time, my mom started freaking out. She told us how she didn’t want us taking them because they had unsafe chemicals. We explained to her how there were actually no chemicals, but we could tell she was still flustered. Later she started trying to convince us that only one of us kids need to take it since we will all have the same results and to resell extra kits to save money. Fast forward: Our parents have been fighting upstairs for the past hour, and we are downstairs trying to figure out who has a different dad.",
        fragment: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents. ",
        prompt_id:"1",
        rating:"2",
        story_date: "21/10/2023",
        
    },
    {
        id: "2",
        user_id: "2",
        title: "TOP STORY",
        content: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents.Today my family got together to exchange presents for our Christmas Eve tradition, and I gave my mom, dad, brother, and 2 sisters each a kit. As soon as everyone opened their gift at the same time, my mom started freaking out. She told us how she didn’t want us taking them because they had unsafe chemicals. We explained to her how there were actually no chemicals, but we could tell she was still flustered. Later she started trying to convince us that only one of us kids need to take it since we will all have the same results and to resell extra kits to save money. Fast forward: Our parents have been fighting upstairs for the past hour, and we are downstairs trying to figure out who has a different dad.",
        fragment: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents. ",
        prompt_id:"1",
        rating:"10",
        story_date: "21/10/2023",
    },
    {
        id: "3",
        user_id: "3",
        title: "TIFU by buying everyone an AncestryDNA kit and ruining Christmas",
        content: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents.Today my family got together to exchange presents for our Christmas Eve tradition, and I gave my mom, dad, brother, and 2 sisters each a kit. As soon as everyone opened their gift at the same time, my mom started freaking out. She told us how she didn’t want us taking them because they had unsafe chemicals. We explained to her how there were actually no chemicals, but we could tell she was still flustered. Later she started trying to convince us that only one of us kids need to take it since we will all have the same results and to resell extra kits to save money. Fast forward: Our parents have been fighting upstairs for the past hour, and we are downstairs trying to figure out who has a different dad.",
        fragment: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents. ",
        prompt_id:"1",
        rating:"1",
        story_date: "21/10/2023",
    },
    {
        id: "4",
        user_id: "4",
        title: "TIFU by buying everyone an AncestryDNA kit and ruining Christmas",
        content: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents.Today my family got together to exchange presents for our Christmas Eve tradition, and I gave my mom, dad, brother, and 2 sisters each a kit. As soon as everyone opened their gift at the same time, my mom started freaking out. She told us how she didn’t want us taking them because they had unsafe chemicals. We explained to her how there were actually no chemicals, but we could tell she was still flustered. Later she started trying to convince us that only one of us kids need to take it since we will all have the same results and to resell extra kits to save money. Fast forward: Our parents have been fighting upstairs for the past hour, and we are downstairs trying to figure out who has a different dad.",
        fragment: "Earlier this year, AncestryDNA had a sale on their kit. I thought it would be a great gift idea so I bought 6 of them for Christmas presents. ",
        prompt_id:"1",
        rating:"0",
        story_date: "21/10/2023",
    },
];

export const StorieContext = createContext({
    stories: null,
    setStorie: () => null,
});

export const StorieProvider = ({children}) =>{
    const [stories,setStorie] = useState(TempStories);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //             const response = await axios.get(`http://localhost/InkScaped/IncScaped/BackEnd/stories`);
    //             const data = response.data || response;
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Error:', error.message);
    //         }
    //     };
    
    //     fetchData(); // Call the asynchronous function
    
    //   }, []);


    const value = {stories, setStorie};
    return(
        <StorieContext.Provider value={value}>
            {children}
        </StorieContext.Provider>
    )
}