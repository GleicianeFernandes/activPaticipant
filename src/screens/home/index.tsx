import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './style'; 
import { Participant } from '../Components/Participant/index';

type ParticipantData = {
  id: number;
  name: string;
};

export default function Home() {
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [name, setName] = useState<string>('');

  const handleAddParticipant = (): void => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    const newParticipant: ParticipantData = {
      id: new Date().getTime(),
      name: name.trim(),
    };

    setParticipants((prev) => [...prev, newParticipant]);
    setName('');
  };

  const handleRemoveParticipant = (id: number): void => {
    Alert.alert(
      'Confirmar Remoção',
      'Deseja realmente remover este participante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => setParticipants((prev) => prev.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listParticipants}>Participantes:</Text>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Participant
            data={{ name: item.name }}
            onDelete={() => handleRemoveParticipant(item.id)}
          />
        
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum participante cadastrado.</Text>
        )}/>

        </View>

    )}
