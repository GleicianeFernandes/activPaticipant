import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./style";

type Props = PressableProps & {
    data: {
        name: string
        
    }
    onDelete: () => void
}

export function Participant({data, onDelete, ...rest}: Props){
    return(
        <Pressable
            style={styles.container}
            {...rest}
        >
            <Text style={styles.participant}>
              {data.name}
            </Text>

            <TouchableOpacity style={styles.button} onPress={onDelete}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </Pressable>
    )
}