import {
    Notification,
    NotificationContent,
    NotificationTitle,
    NotificationText,
    DeleteNotification,
} from './styles'

import colors from '../../styles/colors'

import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface NotificationCardPorps {
    id: string,
    title: string,
    text: string
}

const NotificationCard = ({ id, title, text }: NotificationCardPorps) => {

    const deleteNotification = () => {
        return console.log(id)
    }

    return (
        <Notification key={id}>
            <NotificationContent>
                <NotificationTitle>
                    { title }
                </NotificationTitle>
                <NotificationText>
                    { text }
                </NotificationText>
            </NotificationContent>
                <DeleteNotification>
                    <IconButton style={{color: colors.red}} onClick={deleteNotification}>
                        <DeleteForeverIcon style={{color: colors.red}}/>
                    </IconButton>
                </DeleteNotification>
        </Notification>
    )
}

export default NotificationCard