using UnityEngine;
using UnityEngine.UI;

public class ScoreManager : MonoBehaviour {

	public Text scoreText;
	public Text hiScoreText;

	public float scoreCount;
	public float hiScoreCount;

	public float pointsPerSecond;
	public bool scoreIncreasing;

	private void Start() {
		if(PlayerPrefs.HasKey("HighScore")) {
			hiScoreCount = PlayerPrefs.GetFloat("HighScore");
		}
	}

	void Update () {

		if (scoreIncreasing) {
			scoreCount += pointsPerSecond * Time.deltaTime;
			if (scoreCount > hiScoreCount) {
				hiScoreCount = scoreCount;
				PlayerPrefs.SetFloat("HighScore", hiScoreCount);
			}
		}
		scoreText.text = "Score: " + Mathf.Round(scoreCount).ToString();
		hiScoreText.text = "High Score: " + Mathf.Round(hiScoreCount).ToString();

	}

	public void AddPoints(int pointsToAdd) {
		scoreCount += pointsToAdd;
	}
}
