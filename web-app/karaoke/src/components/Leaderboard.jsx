import React, { Component } from "react";
import Navbar from "./Sidebar"; 
import { Tabs, Table, Tag } from 'antd';
import { auth } from '../firebase'; 
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import winner from "../assets/images/winner.png"; 
import you from "../assets/images/you.png"; 

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
            const leaderboardQuerySnapshot = await getDocs(collection(firestore, 'users'));
            let data = [];
            leaderboardQuerySnapshot.forEach((doc) => {
                data.push({
                    username: doc.data().username,
                    score: doc.data().score,
                    tags: doc.data().tags
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
            const userEntry = data.find(entry => entry.username === username);
            console.log("userEntry: ", userEntry); 
    
            let data_ranking = [];

if (userEntry) {
    const userIndex = data.indexOf(userEntry);
    let startIndex = Math.max(0, userIndex - 2);
    let endIndex = Math.min(data.length - 1, userIndex + 2);

    // Case: User is first
    if (userIndex === 0) {
        endIndex = Math.min(4, data.length - 1);
    }
    // Case: User is last
    else if (userIndex === data.length - 1) {
        startIndex = Math.max(0, data.length - 5);
    }
    // Case: User is in the middle
    else {
        // Ensure we show 2 before and 2 after the user
        startIndex = Math.max(0, userIndex - 2);
        endIndex = Math.min(data.length - 1, userIndex + 2);
    }

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
                        if (record.rank === 1) { // For Rank 1
                            return <img src= {winner} alt="Rank 1" style={{ width: '20px', height: 'auto' }} />;
                        } else if (record.username === curr_username) { // For the user's rank
                            return <img src= {you} alt={`Rank ${text}`} style={{ width: '20px', height: 'auto' }} />;
                        } else {
                            return <span style={{ display: 'block', textAlign: 'center' }}>{text}</span>;
                        }
                    },
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                align: 'center',
            },
            {
                title: 'High Score',
                dataIndex: 'score',
                key: 'score',
                align: 'center',
                render: (text) => <span style={{ display: 'block', textAlign: 'center' }}>{text}</span>,
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                align: 'center',
                render: (_, { tags}) => (
                    <div style={{ textAlign: 'center' }}>
                        {tags && tags.map((tags, index) => {
                            let color;
                            switch (tags) {
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
                                    switch (tags) {
                                        case 'lit':
                                            color = '#FF5733'; // Light Red
                                            break;
                                        case 'dope':
                                            color = '#64DD17'; // Light Green
                                            break;
                                        case 'slick':
                                            color = '#03A9F4'; // Light Blue
                                            break;
                                        case 'boss':
                                            color = '#FFEB3B'; // Yellow
                                            break;
                                        case 'fresh':
                                            color = '#E91E63'; // Pink
                                            break;
                                        case 'smooth':
                                            color = '#9C27B0'; // Purple
                                            break;
                                        case 'fly':
                                            color = '#4CAF50'; // Green
                                            break;
                                        case 'sharp':
                                            color = '#FFC107'; // Amber
                                            break;
                                        case 'swag':
                                            color = '#795548'; // Brown
                                            break;
                                        case 'cool':
                                            color = '#00BCD4'; // Cyan
                                            break;
                                        case 'groovy':
                                            color = '#FF9800'; // Orange
                                            break;
                                        case 'snazzy':
                                            color = '#2196F3'; // Dark Blue
                                            break;
                                        case 'jazzy':
                                            color = '#9E9E9E'; // Grey
                                            break;
                                        case 'rad':
                                            color = '#009688'; // Teal
                                            break;
                                        case 'tight':
                                            color = '#673AB7'; // Deep Purple
                                            break;
                                        case 'sick':
                                            color = '#FF5252'; // Pink Red
                                            break;
                                        case 'stellar':
                                            color = '#607D8B'; // Blue Grey
                                            break;
                                        case 'epic':
                                            color = '#3F51B5'; // Indigo
                                            break;
                                        case 'fire':
                                            color = '#FF1744'; // Red
                                            break;
                                        case 'awesome':
                                            color = '#FF9800'; // Orange
                                            break;
                                        case 'crisp':
                                            color = '#FF5722'; // Deep Orange
                                            break;
                                        case 'killer':
                                            color = '#4CAF50'; // Green
                                            break;
                                        case 'dashing':
                                            color = '#8BC34A'; // Light Green
                                            break;
                                        case 'vibing':
                                            color = '#9C27B0'; // Purple
                                            break;
                                        case 'bomb':
                                            color = '#03A9F4'; // Light Blue
                                            break;
                                        default:
                                            color = '#ff6ac1'; 
                                            break;
                                    }
                                    
                            }
                            return (
                                <Tag color={color} key={`${tags}-${index}`}>
                                    {tags.toUpperCase()}
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