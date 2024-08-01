from __future__ import annotations
import json

from deephaven.plugin.object_type import MessageStream

class DeephavenPluginAudioObject:
    """
    This is a simple object that demonstrates how to send messages to the client.
    When the object is created, it will be passed a connection to the client.
    This connection can be used to send messages back to the client.

    Attributes:
        _connection: MessageStream: The connection to the client
    """
    def __init__(self, url: str | None = None):
        self._connection: MessageStream = None
        self._url = url

    def play(self, url: str | None = None) -> None:
        """
        Play an audio on the client

        Args:
            url: The url of the audio to play
        """
        if url is not None:
            self._url = url

        if self._connection:
            data = {
                "action": "play",
                "payload": self._url
            }
            message = json.dumps(data)
            self._connection.send_message(message)

    def _set_connection(self, connection: MessageStream) -> None:
        """
        Set the connection to the client.
        This is called on the object when it is created.

        Args:
            connection: The connection to the client
        """
        self._connection = connection
        if self._url is not None:
            data = {
                "action": "init",
                "payload": self._url
            }
            message = json.dumps(data)
            self._connection.send_message(message)
