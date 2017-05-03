using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour {

	bool gameHasEnded = false;
	public float restartDelay = 1f;
	public GameObject completeLevelUI;

	public void CompleteLevel() {
		if(!gameHasEnded) {
			Debug.Log("Completed level");
			gameHasEnded = true;
			completeLevelUI.SetActive(true);
		}
	}

	public void EndGame() {
		if(!gameHasEnded) {
			Debug.Log("Game over!");
			gameHasEnded = true;
			Invoke("Restart", restartDelay);
		}
	}

	void Restart() {
		SceneManager.LoadScene(SceneManager.GetActiveScene().name);
	}
}
