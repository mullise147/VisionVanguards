import React, { Component } from "react";
import Navbar from "./Sidebar"; 
import { Tabs, Table, Tag } from 'antd';
import { auth } from '../firebase'; 
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import winner from "../assets/images/winner.png"; 
import you from "../assets/images/you.png"; 
import {Link} from "react-router-dom"; 


const { TabPane } = Tabs;

class Leaderboard extends Component {
    state = {
        title: 'Leaderboard',
        data_leaderboard: [],
        data_ranking: [], 
        curr_username: 'username'
    };

    componentDidMount() {
        this.fetchData();
    }
    
    fetchData = async () => {
        try {
            const firestore = getFirestore();
            const leaderboardQuerySnapshot = await getDocs(collection(firestore, 'leaderboard'));
            let data = [];
            leaderboardQuerySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    name: doc.data().name,
                    score: doc.data().score,
                    tag: doc.data().tag
                });
            });
    
            // Sorting data by score in descending order
            data.sort((a, b) => b.score - a.score);
    
            // Calculate rank based on the order of scores
            data = data.map((entry, index) => ({
                ...entry,
                rank: index + 1 // Rank starts from 1 for the highest score
            }));
    
            // Extracting the top 5 entries for the leaderboard
            const data_leaderboard = data.slice(0, 5);

            // Fetching the username from Firestore based on the current user's email
            const userQuerySnapshot = await getDocs(query(collection(firestore, 'users'), where('email', '==', auth.currentUser.email)));
            let username = '';
            userQuerySnapshot.forEach((doc) => {
                username = doc.data().username; // Assuming the field in Firestore is 'username'
            });
            const curr_username = username; 
    
            // Find user's entry
            const userEntry = data.find(entry => entry.name === username);
    
            // Retrieve entries around the user's rank
            let data_ranking = [];
            if (userEntry) {
                const userIndex = data.indexOf(userEntry);
                const startIndex = Math.max(0, userIndex - 2);
                const endIndex = Math.min(data.length - 1, userIndex + 2);
                data_ranking = data.slice(startIndex, endIndex + 1);
            }
    
            this.setState({ data_leaderboard, data_ranking, curr_username });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    onChange = (key) => {
        if (key === '1') {
            this.setState({ title: 'Leaderboard' });
        } else if (key === '2') {
            this.setState({ title: 'Your Ranking' });
        }
    };

    render() {
        const { title, data_leaderboard, data_ranking, curr_username } = this.state;

        const columns = [
            {
                title: 'Rank',
                dataIndex: 'rank',
                key: 'rank',
                align: 'center',
                render: (text, record, index) => 
                    {
                        if (index === 0) { // For Rank 1
                            return <img src= {winner} alt="Rank 1" style={{ width: '20px', height: 'auto' }} />;
                        } else if (record.name === curr_username) { // For the user's rank
                            return <img src= {you} alt={`Rank ${text}`} style={{ width: '20px', height: 'auto' }} />;
                        } else {
                            return <span style={{ display: 'block', textAlign: 'center' }}>{text}</span>;
                        }
                    },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
                align: 'center',
                render: (text) => <span style={{ display: 'block', textAlign: 'center' }}>{text}</span>,
            },
            {
                title: 'Tags',
                key: 'tag',
                dataIndex: 'tag',
                align: 'center',
                render: (_, { tag }) => (
                    <div style={{ textAlign: 'center' }}>
                        {tag && tag.map((tag, index) => {
                            let color;
                            switch (tag) {
                                case 'newbie':
                                    color = 'volcano';
                                    break;
                                case 'intermediate':
                                    color = 'cyan';
                                    break;
                                case 'pro':
                                    color = 'gold';
                                    break;
                                case 'expert':
                                    color = 'lime';
                                    break;
                                default:
                                    color = tag.length > 5 ? 'geekblue' : 'green';
                            }
                            return (
                                <Tag color={color} key={`${tag}-${index}`}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </div>
                ),
            },
            
            
        ];

        return (
            <>
            <Navbar></Navbar>
            <div>(TEMP) Audio: <Link to="/audio">AUDIO INTEGRATION</Link></div>
            <div>(TEMP) Audio + Video: <Link to="/audio-video">AUDIO + VIDEO INTEGRATION</Link></div>
                <h3 style={{ textAlign: "center", paddingTop: "25px" }}>{title}</h3>
                <div style={{ display: "table", justifyContent: "center", paddingTop: "25px", width: "80%", margin: "0 auto" }}>
                    <Tabs onChange={this.onChange} type="card">
                        <TabPane tab="Leaderboard" key="1">
                            <Table columns={columns} dataSource={data_leaderboard} pagination={false} />
                        </TabPane>
                        <TabPane tab="Your Ranking" key="2">
                            <Table columns={columns} dataSource={data_ranking} pagination={false} />
                        </TabPane>
                    </Tabs>
                </div>
            </>
        )
    }
}

export default Leaderboard;
