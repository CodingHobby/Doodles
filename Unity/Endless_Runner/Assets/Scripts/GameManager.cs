using System.Collections;
using UnityEngine;

public class GameManager : MonoBehaviour {

	public Transform platformGenerator;
	private Vector3 platformStartPoint;

	public PlayerController player;
	private Vector3 playerStartPoint;

	private PlatformDestroyer[] platforms;

	private ScoreManager scoreManager;

	void Start () {
		platformStartPoint = platformGenerator.position;
		playerStartPoint = player.transform.position;

		scoreManager = FindObjectOfType<ScoreManager>();
	}
	
	public void RestartGame() {
		StartCoroutine("RestartGameCo");
	}

	public IEnumerator RestartGameCo() {

		scoreManager.scoreIncreasing = false;

		player.gameObject.SetActive(false);
		yield return new WaitForSeconds(0.5f);

		platforms = FindObjectsOfType<PlatformDestroyer>();
		for(int i = 0; i < platforms.Length; i++) {
			platforms[i].gameObject.SetActive(false);
		}

		player.transform.position = playerStartPoint;
		platformGenerator.position = platformStartPoint;
		player.gameObject.SetActive(true);

		scoreManager.scoreCount = 0;
		scoreManager.scoreIncreasing = true;
	} 
}
