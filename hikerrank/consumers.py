import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from hikerrank.models import Message, Chat


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        current_chat = get_object_or_404(Chat, event_id=data['chat_id'])
        messages = Message.objects.filter(id__in=current_chat).order_by('-timestamp').all()[:10]
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        # send_message packages content dict into json format and send
        # where send is a method of WebsocketConsumer that send data to frontend
        self.send_message(content)

    def new_message(self, data):
        # receive data from frontend as a paramter
        # identify the author of the message, create a message instance in the database
        author_user = get_object_or_404(User, username=data['from'])
        message = Message.objects.create(
            author=author_user,
            content=data['message'])
        # identify the chat instance that the message instance should belong to and added it to chat
        current_chat = get_object_or_404(Chat, event_id=data['chat_id'])
        current_chat.messages.add(message)
        current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    # convert a list of messages to a list of json objects
    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    # convert one message to a json object
    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
