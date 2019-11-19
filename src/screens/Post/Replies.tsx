import * as React from 'react';
import * as moment from 'moment'

const className = 'Reply';
  // FIXME Should be typed  
const Replies = ({ replies } : any) => {
    return (
        <div className='Replies'>
            <hr/>
            <div>Replies</div>
            {
                replies.map((reply:any) => {
                    const { author, content, created_at } = reply;
                    return (
                        <div className={className} key={created_at}>
                            <h5><span style={{fontWeight: 500}}>{author.username}</span> commented {moment.default(created_at, "YYYY-MM-DDTHH:mm:ss.SSS").fromNow()}</h5>
                            <div>{content}</div>
                        </div>
                    );
                 })
            }
        </div>
    )
}

export default Replies;