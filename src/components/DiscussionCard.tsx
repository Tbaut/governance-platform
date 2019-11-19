import * as React from 'react'
import * as moment from 'moment'
import styled from 'styled-components';
import { FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const DiscussionCard = styled.div`
    padding: 20px 30px;
    background-color: #FFF;
    border: 1px solid #EEE;
    h4 {
        color: #282828;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 2px; 
    }
    .authorAndDate {
        color: #555;
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 10px;
        span {
            font-weight: 500;
        }
    }
    ul {
        color: #B5AEAE;
        font-size: 12px;
        font-family: 'Roboto Mono';
        font-weight: 500;
        li {
            display: inline;
            margin-right: 15px;
        }
  }
`;


export interface DiscussionProps {
  title: string
  author: string
  creation_date: string
  replies?: string
  children: React.ReactNode
} 

export default function Discussion ({
        title,
        author,
        creation_date,
        replies
    }:DiscussionProps) {

        return (
            <DiscussionCard>
                <h4>{title}</h4>
                <div className="authorAndDate">posted by <span>{author}</span> {moment.default(creation_date, "YYYY-MM-DDTHH:mm:ss.SSS").fromNow()}</div>
                <ul>
                    <li><FaComment/> {replies} replies</li>
                    <li><FaThumbsUp/> 200 KSM </li>
                    <li><FaThumbsDown/> 210 KSM</li>                   
                </ul>
            </DiscussionCard>
        )
}